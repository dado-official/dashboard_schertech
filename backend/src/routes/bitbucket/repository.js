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
    try {
        const {data} = await bitbucket
            .repositories
            .get({workspace: req.params.workspace, repo_slug: req.params.repo_slug});
        //data.links.avatar.href Repository Avatar


        res.send(data);
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
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

//Returns information about the commits
router.get("/:workspace/:repo_slug/commits", async (req, res) => {
    try {
        const {data} = await bitbucket
            .repositories
            .listCommits({workspace: req.params.workspace, repo_slug: req.params.repo_slug, revision: ""});

        let commits = [];

        data.values.forEach((commit) => {
            let reducedCommit = {
                id: commit.hash.substring(0, 7),
                hash: commit.hash,
                message: commit.message,
                author_name: commit.author?.user?.display_name || "",
                author_raw: commit.author.raw,
                date: commit.date
            };

            commits.push(reducedCommit);
        });

        res.send({
            commit_number: commits.length,
            commits: commits,
        });

    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

module.exports = router;