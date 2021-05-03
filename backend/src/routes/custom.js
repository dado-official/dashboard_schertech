const router = require("express").Router();
const axios = require("axios").default;
const moment = require("moment");

const db = require("@database/db");
const main = require("../app");


//Returns a list of all the custom entries
router.get("/", (req, res) => {
    let sql = `
        SELECT DISTINCT entry_id
        FROM custom_entries
        ORDER BY entry_id`;

    db.all(sql, async (err, rows) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        if (rows.length === 0) {
            console.log("Result is empty");
            return res.sendStatus(204);
        }

        let entryIDs = [];
        rows.forEach((row) => {
            entryIDs.push(row.entry_id);
        });

        let entries = [];
        for (const i in entryIDs) {
            const id = entryIDs[i];
            const res = await axios.get(`http://localhost:${main.port}/api/custom/${id}`);
            entries.push({
                id: id,
                title: res.data.title,
                description: res.data.description,
                frequency: res.data.frequency,
                target_value: res.data.target_value,
                entry_date: res.data.entry_date,
                remaining_time: res.data.remaining_time,
                remaining_time_unix: res.data.remaining_time_unix,
                values_number: res.data.values_number,
                progress: res.data.progress
            });
        }

        entries.sort((a, b) => {
            if (a.remaining_time_unix < b.remaining_time_unix) return -1;
            if (a.remaining_time_unix > b.remaining_time_unix) return 1;
            return 0;
        });


        res.send(entries);
    });
});

//Adds a new entry
router.post("/", (req, res) => {
    moment.locale("en_GB");
    const {title, description, frequency, target_value} = req.body;
    let sql = `
        INSERT
        OR IGNORE 
        INTO custom_entries(title, description, frequency, target_value, entry_date)
        VALUES(?, ?, ?, ?, ?)`;

    db.run(sql, [title, description, frequency, target_value, moment().unix()], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Updates a specific entry
router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {title, description, frequency, target_value} = req.body;

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
    sql += "WHERE entry_id = ?;";
    values.push(id);

    //Invalid SQL syntax
    if (values.length >= 1) {
        return res.sendStatus(400);
    }

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
    const {id} = req.params;
    let sql = `
        DELETE
        FROM custom_entries
        WHERE entry_id = ? `;

    db.run(sql, [id], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Returns all the values from a specific entry and other information
router.get("/:entry_id", (req, res) => {
    moment.locale("en_GB");
    const {entry_id} = req.params;
    let sql = `
        SELECT *
        FROM custom_entries
        LEFT JOIN custom_values
        ON custom_values.entry_id = custom_entries.entry_id
        WHERE custom_entries.entry_id = ?
        ORDER BY value_id`;

    db.all(sql, [entry_id], (err, rows) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        if (rows.length === 0) {
            console.log("Result is empty");
            return res.sendStatus(204);
        }

        let remainingTime;
        let remainingTimeUnix;
        let progress;

        //Checks if there are any values
        if (rows[0].value_id) {
            //Calculate the remaining time
            let lastDate = moment.unix(rows[rows.length - 1].value_date);
            let nextDate = lastDate.add(rows[0].frequency, "days");
            remainingTime = moment(nextDate, "dd:hh:mm").fromNow();
            remainingTimeUnix = 1 - moment().diff(nextDate, "ms");

            //Calculate the progress in percent new / old - 1
            let newValue = rows[rows.length - 1].value;
            let oldValue = rows[rows.length - 2]?.value || rows[rows.length - 1].value;
            progress = (newValue - oldValue) / oldValue * 100;
        }

        const entryInfo = {
            id: rows[0].id,
            title: rows[0].title,
            description: rows[0].description,
            frequency: rows[0].frequency,
            target_value: rows[0].target_value,
            entry_date: rows[0].entry_date,
            remaining_time: remainingTime,
            remaining_time_unix: remainingTimeUnix,
            values_number: rows.length,
            progress: Math.round(progress * 100) / 100
        };

        //Removes data from the array, if it has no values
        if (!rows[0].value_id) {
            rows = [];
        }

        res.send({...entryInfo, data: rows});
    });
});

//Returns a specific value from a specific entry
router.get("/:entry_id/:value_id", (req, res) => {
    const {entry_id, value_id} = req.params;
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
    moment.locale("en_GB");
    const {entry_id} = req.params;
    const {value} = req.body;
    let sql = `
        INSERT
        OR IGNORE
        INTO custom_values(entry_id, value, value_date)
        VALUES(?, ?, ?)`;

    db.run(sql, [entry_id, value, moment().unix()], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Updates a specific value
router.put("/:entry_id/:value_id", (req, res) => {
    const {entry_id, value_id} = req.params;
    const {value} = req.body;
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
    const {entry_id, value_id} = req.params;
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