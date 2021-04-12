/**
 * This is a class for testing
 */
const router = require("express").Router();
const bitbucket  = require("./bitbucket");  //local bitbucket client


//Test to get information about a specific repository
router.get("/repo/:workspace/:repo_slug", async (req, res) => {
    try {
        const {data} = await bitbucket
            .repositories
            .get({workspace: req.params.workspace, repo_slug: req.params.repo_slug});
        res.send(data);
    } catch (err) {
        const {error, status, message} = err;
        console.log("ERROR:", error, status, message);
        res.sendStatus(status);
    }
});

module.exports = router;