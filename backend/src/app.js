const express = require("express");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 4000

app.use("/", routes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});