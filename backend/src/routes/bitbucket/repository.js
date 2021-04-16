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
    const {workspace, repo_slug} = req.params;
    try {
        const {data} = await bitbucket
            .repositories
            .get({workspace: workspace, repo_slug: repo_slug});
        //data.links.avatar.href Repository Avatar
        //branch anzahl mit link ganz am Ende size
        //Zeit moment.js Library

        resultObject={
            owner_name: data.owner.display_name,
            is_private: data.is_private,
            created_on: data.created_on,
            last_updated: data.last_updated,


        }
        res.send(data);
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

//Adds a new repository
router.post("/", async (req, res) => {
    const {workspace, repo_slug} = req.body;
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

//TODO
//Update a specific repository


//Deletes a specific repository
router.delete("/:workspace/:repo_slug", async (req, res) => {
    const {workspace, repo_slug} = req.params;
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
    const {workspace, repo_slug} = req.params;
    try {
        const {data} = await bitbucket
            .repositories
            .listCommits({workspace: workspace, repo_slug: repo_slug, revision: ""});

        let commitData = reduceCommitData(data);
        //Add link to the Bitbucket repository
        commitData["link"] = `https://bitbucket.org/${workspace}/${repo_slug}/commits/`;

        res.send(commitData);
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

//Reduces the commit data you get from the Bitbucket api
function reduceCommitData(data) {
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

    return {
        commit_number: commits.length,
        commits: commits,
    };
}

//Retruns who and how often a commit was made in a repository
router.get("/:workspace/:repo_slug/weeklycommits", async (req, res) => {
    try {
        const {data} = await bitbucket
            .repositories
            .listCommits({workspace: req.params.workspace, repo_slug: req.params.repo_slug, revision: ""});

        let commits = [];
        
        var date = new Date();                      //get date from a week ago to check if commit was within last week
        date.setDate(date.getDate() - 7);   
        
        let commitMap = new Map();

        data.values.forEach((commit) => {
            let reducedCommit = {
                author_name: commit.author?.user?.display_name || "",
                date: commit.date
            };

            let dateCheck = Date.parse(date);                   //Date from a week ago and commitDate need to be parsed to the same format to be compared
            let commitDate = Date.parse(commit.date);

            if(dateCheck < commitDate){                                                     //check if commit was within last week and adding it to map 
                if(commitMap.get(commit.author?.user?.display_name) !== undefined){         //change value of commits issued or add user to the commitmap
                    let counter = commitMap.get(commit.author?.user?.display_name)
                    ++counter;
                    commitMap.set(commit.author?.user?.display_name, counter)
                } else {
                    commitMap.set(commit.author?.user?.display_name, 1)
                }
            }
            commits.push(reducedCommit);
        });
       
        res.send({
            commit_number: commits.length,
            commits: commits,
            commitMap: JSON.stringify([...commitMap])
        });

    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

module.exports = router;