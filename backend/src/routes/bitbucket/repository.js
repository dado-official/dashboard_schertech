const router = require("express").Router();
const bitbucket = require("./bitbucket");
const moment = require("moment");
moment.locale("de");            //TODO change to en-gb

const db = require("@database/db");
const functions = require("./repositoryFunctions")


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

router.get("/:workspace/:repo_slug/menu", async (req, res) => {
    const {workspace, repo_slug} = req.params;
    try {

        const {data} = await bitbucket
            .repositories
            .get({workspace: workspace, repo_slug: repo_slug});
        moment.locale("en-GB");

        var lastUpdate = moment(data.updated_on).format("Do MMMM YYYY, h:mm:ss");
        var last_update_fromnow = moment(lastUpdate, "Do MMMM YYYY, h:mm:ss").fromNow();

        resultObject = {
            owner_name: data.owner.display_name,
            last_update_fromnow: last_update_fromnow,
        }
        res.send(resultObject); 
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

//Returns information about a specific repository
router.get("/:workspace/:repo_slug", async (req, res) => {
    const {workspace, repo_slug} = req.params;
    try {

        const {data} = await bitbucket
            .repositories
            .get({workspace: workspace, repo_slug: repo_slug});
        moment.locale("en-GB");

        var last_update_formatted = moment(data.updated_on).format("L");
        var lastUpdate = moment(data.updated_on).format("Do MMMM YYYY, h:mm:ss");
        var last_update_fromnow = moment(lastUpdate, "Do MMMM YYYY, h:mm:ss").fromNow(); 
        var created_on_formatted = moment(data.created_on).format("L");
        var avatarLink=data.links.avatar.href;

        var branches =await getBranchData(workspace, repo_slug);    //returns branches and number of branches
        var last_commits= await getCommitInfo(workspace, repo_slug); //returns last 30 commits
        //var lines_info=await getLinesInfo(workspace, repo_slug);
       // var weekly_commits=await getWeeklyCommits(workspace, repo_slug);
        //let commits_last_weeks = await getCommitsLastWeeks(workspace, repo_slug);
        let total_commit_number = await getTotalCommitNumber(workspace, repo_slug);

        resultObject = {
            owner_name: data.owner.display_name,
            is_private: data.is_private,
            created_on: created_on_formatted,
            last_updated_formatted: last_update_formatted, //formatted Date p.e. 15.04.2021
            last_update_fromnow: last_update_fromnow,      //time from now p.e. 8 minutes ago
            avatar_link: avatarLink,                       //avatar of repository
            branch_number: branches.branch_number,
            branches: branches.branches,
            //last_commits: last_commits,
            //lines_added: lines_info.lines_added,
            //lines_removed: lines_info.lines_removed,
            total_commit_number: total_commit_number,
            //weekly_commits: weekly_commits,
            //commits_last_weeks: commits_last_weeks
        };
        res.send(resultObject); 
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

//Get data from the repository
router.get("/:id", (req, res) => {
    const {id} = req.params;
    let sql = `
        SELECT *
        FROM repositories
        WHERE id = ?`;

    db.get(sql, [id], (err, row) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        if (!row) {
            console.log("Couldn't find any data");
            return res.sendStatus(400);
        }

        res.send(row);
    });

});

//Adds a new repository
router.post("/", async (req, res) => {
    const {workspace, repo_slug, name, description} = req.body;
    let sql = `
        INSERT
        OR IGNORE 
        INTO repositories(workspace, repo_slug, name, description)
        VALUES(?, ?, ?, ?)`;

    db.run(sql, [workspace, repo_slug, name, description], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Update a specific repository
router.put("/:workspace/:repo_slug", (req, res) => {
    const {workspace, repo_slug} = req.params;
    const {new_workspace, new_repo_slug, name, description} = req.body;

    //Create update statement, only update if a value is given
    let values = [];
    let sql = "UPDATE repositories SET ";
    if (new_workspace) {
        sql += "workspace = ?, ";
        values.push(new_workspace);
    }
    if (new_repo_slug) {
        sql += "repo_slug = ?, ";
        values.push(new_repo_slug);
    }
    if (name) {
        sql += "name = ?, ";
        values.push(name);
    }
    if (description) {
        sql += "description = ?, ";
        values.push(description);
    }
    sql += "WHERE workspace = ? AND repo_slug = ?;";
    values.push(workspace);
    values.push(repo_slug);

    //Invalid SQL syntax
    if (values.length >= 2) {
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
async function getCommitInfo(workspace, repo_slug){
    try {
        const {data} = await bitbucket
            .repositories
            .listCommits({workspace: workspace, repo_slug: repo_slug, revision: ""});

        let commitData = reduceCommitData(data);
        //Add link to the Bitbucket repository
        commitData["link"] = `https://bitbucket.org/${workspace}/${repo_slug}/commits/`;

        return commitData;
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        return null;
    }
}
    
//Reduces the commit data you get from the Bitbucket api
function reduceCommitData(data) {
    let commits = [];
    moment.locale("en-GB");     //TODO remove???

    data.values.forEach((commit) => {
        var commitDate = moment(commit.date).format("Do MMMM YYYY, h:mm:ss");
        var last_change = moment(commitDate, "Do MMMM YYYY, h:mm:ss").fromNow();
        let reducedCommit = {
            id: commit.hash.substring(0, 7),
            hash: commit.hash,
            message: commit.message,
            author_name: commit.author?.user?.display_name || "",
            author_raw: commit.author.raw,
            date: commit.date,
            last_change: last_change
        };

        commits.push(reducedCommit);
    });

    return {
        commit_number: commits.length,
        commits: commits,
    };
}

//returns informations about the branches
async function getBranchData(workspace, repo_slug) {

    const {data} = await bitbucket
            .repositories
            .listRefs({workspace: workspace, repo_slug: repo_slug});

    let branches = [];

    data.values.forEach((branch) => {
        let reducedBranch = {
            name: branch.name,
            author: branch.target.author?.user?.display_name || "",
            //next: branch.next

        };
        branches.push(reducedBranch);
    });

    branchesObj={
        branch_number: branches.length,
        branches: branches,
    };

    return branchesObj;
}

// Specific information

//Returns who and how often a commit was made in a repository
router.get("/:workspace/:repo_slug/chart2", async (req, res) => {
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

            if (dateCheck < commitDate) {                                                     //check if commit was within last week and adding it to map
                if (commitMap.get(commit.author?.user?.display_name) != undefined) {         //change value of commits issued or add user to the commitmap
                    let counter = commitMap.get(commit.author?.user?.display_name);
                    ++counter;
                    commitMap.set(commit.author?.user?.display_name, counter);
                } else {
                    commitMap.set(commit.author?.user?.display_name, 1);
                }
            }
            commits.push(commitMap);
        });
    
        let user = Array.from(commitMap.keys())
        let commitanzahl = Array.from(commitMap.values())
        return res.send({user: user, commitanzahl: commitanzahl});
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(err);
    }
});

//returns all commits in a Repository
router.get("/:workspace/:repo_slug/allcommits", async (req, res) => {
    const {workspace, repo_slug} = req.params;
    let pagelen = 100;
    let page = 1;
    let anzahl = 0;

    try {
        while (true) {
            const {data} = await bitbucket
                .repositories
                .listCommits({workspace: workspace, repo_slug: repo_slug, page: page, pagelen: pagelen, revision: ""});

            let commitData = reduceCommitData(data);
            //Add link to the Bitbucket repository
            commitData["link"] = `https://bitbucket.org/${workspace}/${repo_slug}/commits/`;
            anzahl = anzahl + commitData.commit_number;
            ++page;
            if (commitData.commit_number < 100) {
                return res.send(commitData);
            }
        }
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

//returns all lines added and removed in a repository
async function getLinesInfo(workspace, repo_slug){
    const pagelen = 100;
    let page = 1;
    let anzahl = 0;
    let currentcommit;
    let nextcommit;
    let i = 0;
    let totaladded = 0;
    let totalremoved = 0;
    let result;

    try {
        while (true) {
            const {data} = await bitbucket
                .repositories
                .listCommits({workspace: workspace, repo_slug: repo_slug, page: page, pagelen: pagelen, revision: ""});

            let commitData = reduceCommitData(data);
            //Add link to the Bitbucket repository
            commitData["link"] = `https://bitbucket.org/${workspace}/${repo_slug}/commits/`;

            while (i < commitData.commit_number-1) {
                if (commitData == undefined) {
                    ++i;
                } else {
                    currentcommit = commitData.commits[i].hash;
                    nextcommit = commitData.commits[++i].hash;
                    result = await diffstatCheck(workspace, repo_slug, currentcommit + ".." + nextcommit);
                }

                if (result != undefined) {
                    totaladded = totaladded + result[0];
                    totalremoved = totalremoved + result[1];
                }
            }
            i = 0;

            anzahl = anzahl + commitData.commit_number;
            ++page;

            if (commitData.commit_number < 100) {
                returnObj={
                    lines_added: totaladded,
                    lines_removed: totalremoved,
                    commit_number: anzahl,
                }
                return returnObj;
            }
        }
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        return null;
    }
};

async function diffstatCheck(workspace, reposlug, spec) {
    let lines_added_lines_removed_arr;
    let all_lines_added = 0;
    let all_lines_removed = 0;
    try {
        const {data} = await bitbucket
            .repositories
            .listDiffStats({workspace: workspace, repo_slug: reposlug, spec: spec});
        data.values.forEach(value => {
            all_lines_added = all_lines_added + value.lines_added;
            all_lines_removed = all_lines_removed + value.lines_removed;
            lines_added_lines_removed_arr = [all_lines_added, all_lines_removed];
        });
        return (lines_added_lines_removed_arr);
    } catch (err) {
        return (lines_added_lines_removed_arr);
    }
}

//returns the amount of commits in the last 5 weeks
router.get("/:workspace/:repo_slug/chart1", async (req, res) =>{
    let pagelen = 100
    let page = 1
    let i = 0;
    let commits_last_weeks = [0,0,0,0,0];

    var letschteWochedate = new Date()
    letschteWochedate.setDate(letschteWochedate.getDate() - 7)
    letschteWochedate = Date.parse(letschteWochedate)

    var zweiWochendate = new Date()
    zweiWochendate.setDate(zweiWochendate.getDate() - 14)
    zweiWochendate = Date.parse(zweiWochendate)

    var dreiWochendate = new Date()
    dreiWochendate.setDate(dreiWochendate.getDate() - 21);
    dreiWochendate = Date.parse(dreiWochendate)

    var vierWochendate = new Date();
    vierWochendate.setDate(vierWochendate.getDate() - 28)
    vierWochendate = Date.parse(vierWochendate)

    var fuenfWochendate = new Date()
    fuenfWochendate.setDate(fuenfWochendate.getDate() - 35)
    fuenfWochendate = Date.parse(fuenfWochendate)

    try{
        while(true){
            const {data} = await bitbucket
                .repositories
                .listCommits({workspace: req.params.workspace, repo_slug: req.params.repo_slug, page: page, pagelen: pagelen, revision: ""});
            let commitData = reduceCommitData(data);
            
            while(i < commitData.commit_number-1){
            commitDate = Date.parse(commitData.commits[i].date)
            if1: if(fuenfWochendate < commitDate){
                    if(vierWochendate < commitDate){
                        if(dreiWochendate < commitDate){
                            if(zweiWochendate < commitDate){
                                if(letschteWochedate < commitDate){
                                    let counter = commits_last_weeks[0]
                                    ++counter;
                                    commits_last_weeks[0] = counter
                                    ++i
                                    break if1
                                }
                                let counter = commits_last_weeks[1]
                                    ++counter;
                                    commits_last_weeks[1] = counter
                                ++i
                                break if1
                            }
                            let counter = commits_last_weeks[2]
                                    ++counter;
                                    commits_last_weeks[2] = counter
                            ++i
                            break if1
                        }
                        let counter = commits_last_weeks[3]
                        ++counter;
                        commits_last_weeks[3] = counter
                        ++i
                        break if1
                    }
                    let counter = commits_last_weeks[4]
                    ++counter;
                    commits_last_weeks[4] = counter
                    ++i
                } else {
                    ++i
                    return res.send(commits_last_weeks)
                }
            }
            i = 0;
            ++page
            if(commitData.commit_number < 100){
               return res.send(commits_last_weeks)
            }   
        }
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

//returns total number of commits in a repository
async function getTotalCommitNumber(workspace, repo_slug){
    let pagelen = 100;
    let page = 1
    let anzahl = 0
        try {
            while(true){
                const {data} = await bitbucket
                    .repositories
                    .listCommits({workspace: workspace, repo_slug: repo_slug, page: page, pagelen: pagelen, revision: ""});

                let commitData = reduceCommitData(data);
                //Add link to the Bitbucket repository
                commitData["link"] = `https://bitbucket.org/${workspace}/${repo_slug}/commits/`;
                anzahl = anzahl + commitData.commit_number
                ++page
                if(commitData.commit_number < 100){
                    return ({commit_number: anzahl});
                }   
            }
        } catch (err) {
            const {error, status, message} = err;
            console.log("ERROR:", error, status, message);
            return null;
        }    
};
module.exports = router;