const {Bitbucket} = require("bitbucket");

const clientOptions = {
    baseUrl: "https://api.bitbucket.org/2.0",
    auth: {
        username: process.env.BITBUCKET_USERNAME,
        password: process.env.BITBUCKET_APP_PASSWORD,
    },
};

const bitbucket = new Bitbucket(clientOptions);

module.exports = bitbucket;