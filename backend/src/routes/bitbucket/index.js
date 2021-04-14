const router = require("express").Router();

const repository = require("./repository");

router.use("/repository", repository);

module.exports = router;