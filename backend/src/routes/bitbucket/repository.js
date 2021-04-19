const router = require("express").Router();
const bitbucket = require("./bitbucket");
const db = require("@database/db");
const moment= require("moment");
moment.locale("de");


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
        
        var last_update_formatted=moment(data.updated_on).format("L");
        var lastUpdate=moment(data.updated_on).format("Do MMMM YYYY, h:mm:ss")
        var last_update_fromnow=moment(lastUpdate, "Do MMMM YYYY, h:mm:ss").fromNow();

        var created_on_formatted=moment(data.created_on).format("L");
 

        resultObject={
            owner_name: data.owner.display_name,
            is_private: data.is_private,
            created_on: created_on_formatted,
            last_updated_formatted: last_update_formatted,
            last_update_fromnow: last_update_fromnow,

        }

        res.send(data); 
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

router.get("/:workspace/:repo_slug/test", async (req, res) => {
    const {workspace, repo_slug} = req.params;
    try {

          const {data} = await bitbucket
            .repositories
            .listRefs({workspace: workspace, repo_slug: repo_slug, pagelen: 100});

            let branchData = reduceBranchData(data);
            //Add link to the Bitbucket repository
            branchData["link"] = `https://bitbucket.org/${workspace}/${repo_slug}/branches/`;

        res.send(branchData); 
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

function reduceBranchData(data){
    let branches=[];

    data.values.forEach((branch) => {
        let reducedBranch={
            name: branch.name,
            author: branch.target.author?.user?.display_name || "",

        }
        branches.push(reducedBranch);
    });
    

    return{
        branch_number: branches.length,
        branches: branches,
    };
}

module.exports = router;