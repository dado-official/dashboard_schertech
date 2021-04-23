const bitbucket = require("./bitbucket");
const moment = require("moment");
moment.locale("en-GB");

const db = require("@database/db");


//Returns information about the commits
const getCommitInfo = async (workspace, repo_slug) => {

};

//Reduces the commit data you get from the Bitbucket api
const reduceCommitData = async (data) => {

};

//Returns information about the branch
const getBranchData = async (workspace, repo_slug) => {

};

//Returns information about how often and by whom a commit is made
const getWeeklyCommits = async (workspace, repo_slug) => {

};

//Returns the number of lines added/removed
const getLinesInfo = async (workspace, repo_slug) => {

};

//
const diffStatCheck = async (workspace, repo_slug, spec) => {

};

//Returns the amount of commits from the last 5 weeks
const getCommitsLastWeeks = async (workspace, repo_slug) => {

};

//Returns the total number of commits
const getTotalCommitNumber = async (workspace, repo_slug) => {

};


module.exports = {
    getCommitInfo,
    reduceCommitData,
    getBranchData,
    getWeeklyCommits,
    getLinesInfo,
    diffStatCheck,
    getCommitsLastWeeks,
    getTotalCommitNumber
};