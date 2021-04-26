const bitbucket = require("./bitbucket");
const moment = require("moment");
moment.locale("en-GB");


//Returns information about the commits
const getCommitInfo = async (workspace, repo_slug) => {
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
};

//Reduces the commit data you get from the Bitbucket api
const reduceCommitData = async (data) => {
    let commits = [];

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
};

//Returns information about the branch
const getBranchData = async (workspace, repo_slug) => {
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

    branchesObj = {
        branch_number: branches.length,
        branches: branches,
    };

    return branchesObj;
};

//Returns the number of lines added/removed
const getLinesInfo = async (workspace, repo_slug) => {
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

            while (i < commitData.commit_number - 1) {
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
                returnObj = {
                    lines_added: totaladded,
                    lines_removed: totalremoved,
                    commit_number: anzahl,
                };
                return returnObj;
            }
        }
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        return null;
    }
};

//
const diffStatCheck = async (workspace, repo_slug, spec) => {
    let lines_added_lines_removed_arr;
    let all_lines_added = 0;
    let all_lines_removed = 0;
    try {
        const {data} = await bitbucket
            .repositories
            .listDiffStats({workspace: workspace, repo_slug: repo_slug, spec: spec});
        data.values.forEach(value => {
            all_lines_added = all_lines_added + value.lines_added;
            all_lines_removed = all_lines_removed + value.lines_removed;
            lines_added_lines_removed_arr = [all_lines_added, all_lines_removed];
        });
        return (lines_added_lines_removed_arr);
    } catch (err) {
        return (lines_added_lines_removed_arr);
    }
};

//Returns the total number of commits
const getTotalCommitNumber = async (workspace, repo_slug) => {
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
                return ({commit_number: anzahl});
            }
        }
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        return null;
    }
};


module.exports = {
    getCommitInfo,
    reduceCommitData,
    getBranchData,
    getLinesInfo,
    diffStatCheck,
    getTotalCommitNumber
};