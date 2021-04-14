const router = require("express").Router();
const bitbucket = require("./bitbucket");
const db = require("@database/db");


//Returns a list of all the repositories
router.get("/", async (req, res) => {
    let sql = `
        SELECT *
        FROM repositories`;

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

//Returns information about a specific repository
router.get("/:workspace/:repo_slug", async (req, res) => {
    let workspace = req.params.workspace;
    let repo_slug = req.params.repo_slug;
    let sql = `
        SELECT *
        FROM repositories
        WHERE workspace = ?
          AND repo_slug = ?`;

    db.get(sql, [workspace, repo_slug], (err, row) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        if (!row) {
            console.log("Result is empty");
            return res.sendStatus(204);
        }

        console.log("after");

        res.send(row);
    });
});

//Adds a new repository
router.post("/", async (req, res) => {
    let workspace = req.body.workspace;
    let repo_slug = req.body.repo_slug;
    let sql = `
        INSERT
        OR IGNORE 
        INTO repositories(workspace, repo_slug)
        VALUES(?, ?)`;

    db.run(sql, [workspace, repo_slug], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Deletes a specific repository
router.delete("/:workspace/:repo_slug", async (req, res) => {
    let workspace = req.params.workspace;
    let repo_slug = req.params.repo_slug;
    let sql = `
        DELETE
        FROM repositories
        WHERE workspace = ?
          AND repo_slug = ? `;

    db.run(sql, [workspace, repo_slug], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});


module.exports = router;