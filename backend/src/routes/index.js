const router = require("express").Router();

const repository = require("./bitbucket/repository");
const server = require("./server");
const custom = require("./custom");

router.use("/repository", repository);
router.use("/server", server);
router.use("/custom", custom);

module.exports = router;