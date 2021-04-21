const router = require("express").Router();
const db = require("@database/db");
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");

//Returns a list of all the custom entries
router.get("/", (req, res) => {
    let sql = `
        SELECT *
        FROM custom_entries`;

    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        if (rows.length === 0) {
            console.log("Result is empty");
            return res.sendStatus(204);
        }

        res.send(rows);
    });
});

//Adds a new entry
router.post("/", (req, res) => {
    const { title, description, frequency, target_value } = req.body;
    let sql = `
        INSERT
        OR IGNORE 
        INTO custom_entries(title, description, frequency, target_value, date)
        VALUES(?, ?, ?, ?)`;

    db.run(
        sql,
        [title, description, frequency, target_value, new Date()],
        (err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(400);
            }

            res.sendStatus(200);
        }
    );
});

//Updates a specific entry
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, frequency, target_value } = req.body;

    //TODO make this better, if possible
    //Create update statement, only update if a value is given
    let values = [];
    let sql = "UPDATE custom_entries SET ";
    if (title) {
        sql += "title = ?, ";
        values.push(title);
    }
    if (description) {
        sql += "description = ?, ";
        values.push(description);
    }
    if (frequency) {
        sql += "frequency = ?, ";
        values.push(frequency);
    }
    if (target_value) {
        sql += "target_value = ?, ";
        values.push(target_value);
    }
    sql += "WHERE id = ?;";
    values.push(id);

    //Regex to remove the last comma in this string:
    //https://stackoverflow.com/questions/5497318/replace-last-occurrence-of-character-in-string/
    sql = sql.replace(/,([^,]*)$/, "$1");

    db.run(sql, values, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Deletes an entry and all values connected to it
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    let sql = `
        DELETE
        FROM custom_entries
        WHERE id = ? `;

    db.run(sql, [id], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Returns all the values from a specific entry and the completion percent
router.get("/:entry_id", (req, res) => {
    const { entry_id } = req.params;
    let sql = `
        SELECT *
        FROM custom_values 
        INNER JOIN custom_entries
        WHERE custom_entries.id = ? AND custom_values.entry_id = ?`;

    db.all(sql, [entry_id, entry_id], (err, rows) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        if (rows.length === 0) {
            console.log("Result is empty");
            return res.sendStatus(204);
        }

        let lastDate = moment.unix(rows[rows.length - 1].date);
        let nextDate = lastDate.add(rows[0].frequency, "days");
        let currentDate = moment();
        let remainingTime = moment
            .duration(nextDate.diff(currentDate))
            .format("dd:hh:mm");

        const entryInfo = {
            title: rows[0].title,
            description: rows[0].description,
            frequency: rows[0].frequency,
            target_value: rows[0].target_value,
            date: rows[0].date,
            remaining_time: remainingTime,
            values_number: rows.length,
        };

        res.send(Object.assign({}, entryInfo, rows));
    });
});

//Returns a specific value from a specific entry
router.get("/:entry_id/:value_id", (req, res) => {
    const { entry_id, value_id } = req.params;
    let sql = `
        SELECT *
        FROM custom_values
        WHERE entry_id = ?
          AND value_id = ?`;

    db.get(sql, [entry_id, value_id], (err, row) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.send(row);
    });
});

//Adds a new value to a specific entry
router.post("/:entry_id", (req, res) => {
    const { entry_id } = req.params;
    const { value } = req.body;
    let sql = `
        INSERT
        OR IGNORE
        INTO custom_values(entry_id, value, date)
        VALUES(?, ?, ?)`;

    db.run(sql, [entry_id, value, new Date()], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Updates a specific value
router.put("/:entry_id/:value_id", (req, res) => {
    const { entry_id, value_id } = req.params;
    const { value } = req.body;
    let sql = `
        UPDATE custom_values
        SET value = ?
        WHERE entry_id = ?
          AND value_id = ?`;

    db.run(sql, [value, entry_id, value_id], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
    });

    res.sendStatus(200);
});

//Deletes a specific value from a specific entry
router.delete("/:entry_id/:value_id", (req, res) => {
    const { entry_id, value_id } = req.params;
    let sql = `
        DELETE
        FROM custom_values
        WHERE entry_id = ?
          AND value_id = ?`;

    db.run(sql, [entry_id, value_id], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

module.exports = router;
