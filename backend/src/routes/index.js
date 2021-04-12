const router = require("express").Router();

const bitbucket = require("./bibucket");
const server = require("./server");

router.use("/bitbucket", bitbucket);
router.use("/server", server);

module.exports = router;