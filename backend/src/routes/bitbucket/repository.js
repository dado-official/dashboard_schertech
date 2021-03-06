const router = require("express").Router();
const bitbucket = require("./bitbucket");
const moment = require("moment");

const db = require("@database/db");
const functions = require("./repositoryFunctions");


//Database functions

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

    //Regex to remove the last comma in this string:
    //https://stackoverflow.com/questions/5497318/replace-last-occurrence-of-character-in-string/
    sql = sql.replace(/,([^,]*)$/, "$1");

    //Invalid SQL syntax
    if (values.length <= 2) {
        return res.sendStatus(400);
    }

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

//Get data about the repository from the database
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


//Bitbucket API functions

//Returns all information about a specific repository
router.get("/:workspace/:repo_slug", async (req, res) => {
    moment.locale("en-gb");
    const {workspace, repo_slug} = req.params;

    try {
        const {data} = await bitbucket
            .repositories
            .get({workspace: workspace, repo_slug: repo_slug});
        const lastUpdateFormatted = moment(data.updated_on).format("L");
        const lastUpdate = moment(data.updated_on).format("Do MMMM YYYY, h:mm:ss");
        const lastUpdateFromNow = moment(lastUpdate, "Do MMMM YYYY, h:mm:ss").fromNow();
        const createdOnFormatted = moment(data.created_on).format("L");
        const avatarLink = data.links.avatar.href;

        //TODO change to promise.all
        const branches = await functions.getBranchData(workspace, repo_slug);       //Returns branches and number of branches
        if (branches.branch_number >= 100) {
            branches.branch_number = ">=100";
        }
        //const last_commits = await functions.getCommitInfo(workspace, repo_slug);   //Returns last 30 commits
        const total_commit_number = await functions.getTotalCommitNumber(workspace, repo_slug);

        const resultObject = {
            owner_name: data.owner.display_name,
            is_private: data.is_private,
            created_on: createdOnFormatted,
            last_updated_formatted: lastUpdateFormatted,    //Formatted Date p.e. 15.04.2021
            last_update_fromnow: lastUpdateFromNow,         //Time from now p.e. 8 minutes ago
            avatar_link: avatarLink,                        //Avatar of repository
            branch_number: branches.branch_number,
            branches: branches.branches,
            total_commit_number: total_commit_number,
            link: `https://bitbucket.org/${workspace}/${repo_slug}/commits/`
            //last_commits: last_commits,
        };

        res.send(resultObject);
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

//Returns minor information about the repository
router.get("/:workspace/:repo_slug/menu", async (req, res) => {
    moment.locale("en-GB");
    const {workspace, repo_slug} = req.params;

    try {
        const {data} = await bitbucket
            .repositories
            .get({workspace: workspace, repo_slug: repo_slug});

        const lastUpdate = moment(data.updated_on).format("Do MMMM YYYY, h:mm:ss");
        const lastUpdateFromNow = moment(lastUpdate, "Do MMMM YYYY, h:mm:ss").fromNow();

        const resultObject = {
            owner_name: data.owner.display_name,
            last_update_fromnow: lastUpdateFromNow,
        };

        res.send(resultObject);
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

//Returns the amount of commits from the last 5 weeks
router.get("/:workspace/:repo_slug/chart1", async (req, res) => {
    let pagelen = 100;
    let page = 1;
    let i = 0;
    let commits_last_weeks = [0, 0, 0, 0, 0];

    let lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    lastWeekDate = Date.parse(lastWeekDate.toString());

    let secondWeekDate = new Date();
    secondWeekDate.setDate(secondWeekDate.getDate() - 14);
    secondWeekDate = Date.parse(secondWeekDate.toString());

    let thirdWeekDate = new Date();
    thirdWeekDate.setDate(thirdWeekDate.getDate() - 21);
    thirdWeekDate = Date.parse(thirdWeekDate.toString());

    let fourthWeekDate = new Date();
    fourthWeekDate.setDate(fourthWeekDate.getDate() - 28);
    fourthWeekDate = Date.parse(fourthWeekDate.toString());

    let fifthWeekDate = new Date();
    fifthWeekDate.setDate(fifthWeekDate.getDate() - 35);
    fifthWeekDate = Date.parse(fifthWeekDate.toString());

    try {
        while (true) {
            const {data} = await bitbucket
                .repositories
                .listCommits({
                    workspace: req.params.workspace,
                    repo_slug: req.params.repo_slug,
                    page: page,
                    pagelen: pagelen,
                    revision: ""
                });
            let commitData = functions.reduceCommitData(data);

            while (i < commitData.commit_number - 1) {
                let commitDate = Date.parse(commitData.commits[i].date);
                if1: if (fifthWeekDate < commitDate) {
                    if (fourthWeekDate < commitDate) {
                        if (thirdWeekDate < commitDate) {
                            if (secondWeekDate < commitDate) {
                                if (lastWeekDate < commitDate) {
                                    let counter = commits_last_weeks[0];
                                    ++counter;
                                    commits_last_weeks[0] = counter;
                                    ++i;
                                    break if1;
                                }
                                let counter = commits_last_weeks[1];
                                ++counter;
                                commits_last_weeks[1] = counter;
                                ++i;
                                break if1;
                            }
                            let counter = commits_last_weeks[2];
                            ++counter;
                            commits_last_weeks[2] = counter;
                            ++i;
                            break if1;
                        }
                        let counter = commits_last_weeks[3];
                        ++counter;
                        commits_last_weeks[3] = counter;
                        ++i;
                        break if1;
                    }
                    let counter = commits_last_weeks[4];
                    ++counter;
                    commits_last_weeks[4] = counter;
                    ++i;
                } else {
                    ++i;
                    return res.send(commits_last_weeks);
                }
            }
            i = 0;
            ++page;
            if (commitData.commit_number < 100) {
                return res.send(commits_last_weeks);
            }
        }
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

//Returns information about how often and by whom a commit was made
router.get("/:workspace/:repo_slug/chart2", async (req, res) => {
    let commitMap = new Map();
    let i = 0;
    let page = 1;
    let pagelen = 100;

    let date = new Date();                      //get date from a week ago to check if commit was within last week
    date.setDate(date.getDate() - 7);
    let dateCheck = Date.parse(date);                   //Date from a week ago and commitDate need to be parsed to the same format to be compared

    try {
        while (true) {
            const {data} = await bitbucket
                .repositories
                .listCommits({
                    workspace: req.params.workspace,
                    repo_slug: req.params.repo_slug,
                    page: page,
                    pagelen: pagelen,
                    revision: ""
                });
            let commitData = functions.reduceCommitData(data);

            while (i < commitData.commit_number - 1) {
                let commitDate = Date.parse(commitData.commits[i].date);

                if (dateCheck < commitDate) {                                                    //check if commit was within last week and adding it to map
                    if (commitMap.get(commitData.commits[i].author_raw) != undefined) {
                        let counter = commitMap.get(commitData.commits[i].author_raw);          //change value of commits issued or add user to the commitmap
                        ++counter;
                        commitMap.set(commitData.commits[i].author_raw, counter);
                        ++i;
                    } else {
                        commitMap.set(commitData.commits[i].author_raw, 1);
                        ++i;
                    }
                } else {
                    let user = Array.from(commitMap.keys());
                    i = 0;
                    while (i < user.length) {
                        let temp = user[i].split("<", 1);
                        user[i] = temp;
                        ++i;
                    }
                    let commitanzahl = Array.from(commitMap.values());
                    i = 0;
                    let j = 0;
                    let tempuser;
                    let tempcommitanzahl = 0;
                    let tempindex = 0;
                    let usersorted = [];
                    let commitanzahlsorted = [];
                    while (j < commitanzahl.length) {
                        while (i < user.length) {
                            if (commitanzahl[i] > tempcommitanzahl) {
                                tempindex = i;
                                tempcommitanzahl = commitanzahl[i];
                                tempuser = user[i];
                                ++i;
                            } else {
                                ++i;
                            }
                        }
                        commitanzahl[tempindex] = 0;
                        usersorted[j] = tempuser;
                        commitanzahlsorted[j] = tempcommitanzahl;
                        tempcommitanzahl = 0;
                        i = 0;
                        ++j;
                    }
                    return res.send({user: usersorted, commitanzahl: commitanzahlsorted});
                }
            }
            i = 0;
            ++page;

            if (commitData.commit_number < 100) {
                let user = Array.from(commitMap.keys());
                i = 0;
                while (i < user.length) {
                    let temp = user[i].split("<", 1);
                    user[i] = temp;
                    ++i;
                }
                let commitanzahl = Array.from(commitMap.values());
                return res.send({user: usersorted, commitanzahl: commitanzahlsorted});
            }
        }
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(err);
    }
});

//Returns all commits in a Repository
router.get("/:workspace/:repo_slug/allcommits", async (req, res) => {
    const {workspace, repo_slug} = req.params;
    const pagelen = 100;
    let page = 1;
    let quantity = 0;

    try {
        while (true) {
            const {data} = await bitbucket
                .repositories
                .listCommits({
                    workspace: workspace,
                    repo_slug: repo_slug,
                    page: page.toString(),
                    pagelen: pagelen,
                    revision: ""
                });

            let commitData = functions.reduceCommitData(data);
            quantity = quantity + commitData.commit_number;
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

//returns the last 30 commits for latest commits in frontend
router.get("/:workspace/:repo_slug/lastcommits", async (req, res) => {
    const {workspace, repo_slug} = req.params;
    let lastcommits;
    try {
        const {data} = await bitbucket
            .repositories
            .listCommits({workspace: workspace, repo_slug: repo_slug, revision: ""});
        let commitData = functions.reduceCommitData(data);
        lastcommits = commitData.commits;

        //Sorts the last 30 commits by date
        lastcommits.sort((a, b) => {
            a = new Date(a);
            b = new Date(b);
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        });

        res.send(lastcommits);
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});


module.exports = router;