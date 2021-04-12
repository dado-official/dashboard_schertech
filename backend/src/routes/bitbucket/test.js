const router = require("express").Router();
const {Bitbucket} = require("bitbucket");

const clientOptions = {
    baseUrl: "https://api.bitbucket.org/2.0",
    request: {
        timeout: 10,
    },
    auth: {
        token: process.env.BIBUCKET_TOKEN,
    }
};

const bitbucket = new Bitbucket(clientOptions);

router.get("/", async (req, res) => {
    try {
        const {data, headers, status, url} = await bitbucket.repositories.get({
            workspace: "atlassian",
            repo_slug: "atlassian-event"
        });
        console.log(data.values);
    } catch (err) {
        const {message, error, headers, request, status} = err;
    }

    /*
        bitbucket.repositories.get({ workspace: "atlassian", repo_slug: "atlassian-event"})
            .then(({data, headers}) => {
                console.log(data);
            })
            .catch((err) => console.error(err));
     */
    /*
    try {
        const {data, headers, status, url} = await bitbucket.repositories.list({workspace: "dashboardtest"});
        res.send(data.values)
    } catch (err) {
        const {message, error, headers, request, status} = err;
        res.status(400)
    }
     */
});

module.exports = router;