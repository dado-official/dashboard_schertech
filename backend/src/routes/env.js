const router = require("express").Router();
const fs = require("fs");
const readline = require("readline");

const ENV_PATH = "../backend/.env";


//Get a list of all environment variables
router.get("/", async (req, res) => {
    const envMap = await fileToMap(ENV_PATH);

    res.send(envMap);
});

//Get a specific environment variable
router.get("/:key", async (req, res) => {
    const {key} = req.params;
    const envMap = await fileToMap(ENV_PATH);

    if (key in envMap) {
        res.send(envMap[key]);
    } else {
        res.sendStatus(204);
    }
});

//Add an environment variable
router.post("/", async (req, res) => {
    const {key, value} = req.body;
    const envMap = await fileToMap(ENV_PATH);

    envMap[key] = value;

    mapToFile(envMap, ENV_PATH);

    res.sendStatus(200);
});

//Update aa environment variable
router.put("/:key", async (req, res) => {
    const {key} = req.params;
    const {value} = req.body;
    const envMap = await fileToMap(ENV_PATH);

    if (key in envMap) {
        envMap[key] = value;

        mapToFile(envMap, ENV_PATH);

        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

//Delete an environment variable
router.delete("/:key", async (req, res) => {
    const {key} = req.params;
    const envMap = await fileToMap(ENV_PATH);

    delete envMap[key];

    mapToFile(envMap, ENV_PATH);

    res.sendStatus(200);
});


const fileToMap = async (filePath) => {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });

    const envMap = {};

    for await (const line of readInterface) {
        if (line && !line.startsWith("#")) {
            const key = line.substr(0, line.indexOf("="));
            const value = line.substr(line.indexOf("=") + 1, line.length - 1);

            envMap[key] = value;
        }
    }

    return envMap;
};

const mapToFile = (map, filePath) => {
    const writeStream = fs.createWriteStream(filePath, {
        flags: "w"
    });

    for (const [key, value] of Object.entries(map)) {
        writeStream.write(`${key}=${value}\n`);
    }
};


module.exports = router;