const router = require("express").Router();
const db = require("@database/db");

//Returns a list of all the custom entries
router.get("/", (req, res) => {
    let sql = `
        SELECT *
        FROM customs`;

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
    const {title, description, frequency, target_value} = req.body;
    let sql = `
    INSERT OR IGNORE 
    INTO customs(title, description, frequency, target_value)
    VALUES(?, ?, ?, ?)`;
    console.log(title);
    db.run(sql, [title, description, frequency, target_value], (err) => {
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
        DELETE FROM customs
        WHERE id = ? `;

    db.run(sql, [id], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Returns all values from a specific entry
router.get("/:id", (req, res) => {

});

router.post("/:id", (req, res) => {

});

router.delete("/:id/:date", (req, res) => {

});

module.exports = router;