const router = require("express").Router();
const commit = require("./commit");
router.use("/commit", commit);

module.exports = router;