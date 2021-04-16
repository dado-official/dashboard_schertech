const router = require("express").Router();

const bitbucket = require("./bitbucket");
const server = require("./server");
const custom = require("./custom");

router.use("/bitbucket", bitbucket);
router.use("/server", server);
router.use("/custom", custom);

module.exports = router;