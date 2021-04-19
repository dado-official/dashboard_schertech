const router = require("express").Router();

const repository = require("./bitbucket/repository");
const server = require("./server");

router.use("/repository", repository);
router.use("/server", server);

module.exports = router;