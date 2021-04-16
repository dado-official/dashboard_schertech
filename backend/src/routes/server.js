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
router.get("/:hostname", async (req, res) => {
    var username;
    var password;
    let sql= "SELECT * FROM servers WHERE hostname=?"
    db.get(sql, [req.params.hostname], async (err, row) => {   //gets username and password from local database
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        username=row.db_username.toString();
        password=row.db_password.toString();

        console.log("Username: " + username + " Password: " + password);


        const connection = await mysql.createConnection({  //create connection to db
            host: req.params.hostname,
            user: username,
            password: password  
        });

        connection.ping(err => { //check if db is online
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