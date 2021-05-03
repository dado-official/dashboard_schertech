const router = require("express").Router();

const repository = require("./bitbucket/repository");
const server = require("./server");
const custom = require("./custom");
const env = require("./env");

router.use("/repository", repository);
router.use("/server", server);
router.use("/custom", custom);
router.use("/env", env);

module.exports = router;