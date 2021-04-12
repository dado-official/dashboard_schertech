const router = require("express").Router();

const test = require("./test");
const repository = require("./repository");
const commit = require("./commit");

router.use("/test", test);
router.use("/repository", repository);
router.use("/commit", commit);

module.exports = router;