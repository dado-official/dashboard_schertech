const router = require("express").Router();
const db = require("@database/db");
const mysql=require("mysql");


//Returns a list of all the servers
router.get("/", async (req, res) => {
    let sql = `
        SELECT *
        FROM servers`;

    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        if (rows.length === 0) {
            console.log("Result is empty");
            return res.sendStatus(204);
        }

        res.send(rows);
    });
});

//Checks if database of server is reachable
router.get("/:hostname/:username/:password", async (req, res) => {
    const connection = await mysql.createConnection({
        host: req.params.hostname,
        user: req.params.username,
        password: req.params.password   
    });
    connection.ping(err => {
        try{
            if(err){
                console.log("Error connecting");
                throw new Error("Database not reachable");
            }else{
                console.log("Pingable!");
                res.send("true");
            }
        }catch(e){
            console.log(e.message);
            res.send("false");
        }finally{
            connection.end();
        }
        
    })
});

//Adds a new server
router.post("/", async (req, res) => {
    let hostname = req.body.hostname;
    let sql = `
        INSERT
        OR IGNORE 
        INTO servers(hostname)
        VALUES(?)`;

    db.run(sql, [hostname], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Deletes a specific server
router.delete("/:hostname", async (req, res) => {
    let hostname = req.params.hostname;
    let sql = `
        DELETE
        FROM repositories
        WHERE workspace = ?
          AND repo_slug = ? `;

    db.run(sql, [hostname], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

module.exports = router;