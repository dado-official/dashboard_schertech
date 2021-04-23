require("dotenv").config(); //Allows the use of .env files
require("module-alias/register"); //Registers module aliases
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

exports.port = port;
