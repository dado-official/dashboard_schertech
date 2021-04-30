const bitbucket = require("./bitbucket");
const moment = require("moment");

//Returns information about the commits
const getCommitInfo = async (workspace, repo_slug) => {
    try {
        const {data} = await bitbucket
            .repositories
            .listCommits({workspace: workspace, repo_slug: repo_slug, revision: ""});

        const commitData = reduceCommitData(data);

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
const reduceCommitData = (data) => {
    moment.locale("en-GB");
    let commits = [];

    data.values.forEach((commit) => {
        const commitDate = moment(commit.date).format("Do MMMM YYYY, h:mm:ss");
        const lastChange = moment(commitDate, "Do MMMM YYYY, h:mm:ss").fromNow();
        const reducedCommit = {
            id: commit.hash.substring(0, 7),
            hash: commit.hash,
            message: commit.message,
            author_name: commit.author?.user?.display_name || "",
            author_raw: commit.author.raw,
            date: commit.date,
            last_change: lastChange,
            author_icon: commit.author?.user?.links.avatar.href
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
        .listRefs({workspace: workspace, repo_slug: repo_slug, pagelen: 100});

    const branches = [];

    data.values.forEach((branch) => {
        let reducedBranch = {
            name: branch.name,
            author: branch.target.author?.user?.display_name || "",
            //next: branch.next
        };
        branches.push(reducedBranch);
    });

    return {
        branch_number: branches.length,
        branches: branches,
    };
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

    let returnObj;

    try {
        while (true) {
            const {data} = await bitbucket
                .repositories
                .listCommits({
                    workspace: workspace,
                    repo_slug: repo_slug,
                    page: page,
                    pagelen: pagelen,
                    revision: ""
                });

            let commitData = reduceCommitData(data);

            while (i < commitData.commit_number - 1) {
                currentcommit = commitData.commits[i].hash;
                nextcommit = commitData.commits[++i].hash;
                result = await diffStatCheck(workspace, repo_slug, currentcommit + ".." + nextcommit);

                if (result !== undefined) {
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
    let quantity = 0;
    try {
        while (page<11) {
            const {data} = await bitbucket
                .repositories
                .listCommits({workspace: workspace, repo_slug: repo_slug, page: page, pagelen: pagelen, revision: ""});

            let commitData = reduceCommitData(data);
            //Add link to the Bitbucket repository
            commitData["link"] = `https://bitbucket.org/${workspace}/${repo_slug}/commits/`;
            quantity = quantity + commitData.commit_number;
            ++page;
            if (commitData.commit_number < 100) {
                return (quantity);
            }
        }
        return (">1000");
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