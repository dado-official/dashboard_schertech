const router = require("express").Router();

const test = require("./test");
const commit = require("./commit");

router.use("/test", test);
router.use("/commit", commit);

module.exports = router;