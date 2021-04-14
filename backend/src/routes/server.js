const router = require("express").Router();
const db = require("@database/db");

//Returns a list of all the servers
router.get("/", async (req, res) => {
    let sql = `
        SELECT *
        FROM servers`;

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

//Returns information about a specific server
router.get("/:hostname", async (req, res) => {
    res.send({
        hostname: req.params.hostname
    });
});

//Adds a new server
router.post("/", async (req, res) => {
    let hostname = req.body.hostname;
    let sql = `
        INSERT
        OR IGNORE 
        INTO servers(hostname)
        VALUES(?)`;

    db.run(sql, [hostname], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Deletes a specific server
router.delete("/:hostname", async (req, res) => {
    let hostname = req.params.hostname;
    let sql = `
        DELETE
        FROM repositories
        WHERE workspace = ?
          AND repo_slug = ? `;

    db.run(sql, [hostname], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

module.exports = router;