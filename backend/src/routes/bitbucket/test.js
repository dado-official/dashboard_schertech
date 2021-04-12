/**
 * This is a class for testing
 */
const router = require("express").Router();
const {Bitbucket} = require("bitbucket");


const clientOptions = {
    baseUrl: "https://api.bitbucket.org/2.0",
    auth: {
        username: process.env.BITBUCKET_USERNAME,
        password: process.env.BITBUCKET_APP_PASSWORD,
    },
};

const bitbucket = new Bitbucket(clientOptions);


//Test to get information about a specific repository
router.get("/repo/:workspace/:repo_slug", async (req, res) => {
    try {
        const {data} = await bitbucket
            .repositories
            .get({workspace: req.params.workspace, repo_slug: req.params.repo_slug});
        res.send(data);
    } catch (err) {
        const {message, error} = err;
        console.log("ERROR: ", error, message);
        res.sendStatus(404);
    }
});

module.exports = router;