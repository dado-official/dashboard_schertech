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

//Returns information about a specific server
router.get("/:hostname", async (req, res) => {
     /* connection.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
        res.send("Connected");
      }); */
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'test',
        password: 'test123',
        database: 'csgo'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.send("Error connecting");
        }
        console.log('connection authenticated: ' + (connection.state == "authenticated"));
        console.log('connected as id ' + connection.threadId);
        console.log("connection: " + connection.state);
        res.send(connection.state == "authenticated");
    });    
    

    /* connection.query('SELECT * FROM map', (err,rows) => {
        if(err) throw err;
      
        console.log('Data received from Db:');
        console.log(rows);
      }); */
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