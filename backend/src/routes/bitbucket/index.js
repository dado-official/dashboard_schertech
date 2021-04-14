const router = require("express").Router();

const repository = require("./repository");
const commit = require("./commit");

router.use("/repository", repository);
router.use("/commit", commit);

module.exports = router;