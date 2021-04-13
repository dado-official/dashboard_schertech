const router = require("express").Router();

const bitbucket = require("./bitbucket");
const server = require("./server");

router.use("/bitbucket", bitbucket);
router.use("/server", server);

module.exports = router;