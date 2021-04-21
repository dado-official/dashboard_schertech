const router = require("express").Router();
const db = require("@database/db");
const mysql = require("mysql");

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
            return res.send([]);
        }

        res.send(rows);
    });
});

//Checks if database of server is reachable
router.get("/:hostname", async (req, res) => {
    const {hostname} = req.params;
    let sql = `
        SELECT *
        FROM servers
        WHERE hostname = ?`;

    db.get(sql, [hostname], async (err, row) => {
        //gets username and password from local database
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        if (!row) {
            console.log("Couldn't find any data");
            return res.sendStatus(400);
        }

        const {db_username, db_password, db_port} = row;
        console.log(
            `Username: ${db_username} Password: ${db_password} Port: ${db_port}`
        );

        const connection = await mysql.createConnection({
            //create connection to db
            host: hostname,
            user: db_username,
            password: db_password,
        });

        connection.ping((err) => {
            //check if db is online
            try {
                if (err) {
                    throw new Error("Database not reachable");
                } else {
                    console.log("Pingable!");
                    res.send({reachable: true});
                }
            } catch (e) {
                console.log(e.message);
                res.send({reachable: false});
            } finally {
                connection.end();
            }
        });
    });
});

//Adds a new server
router.post("/", async (req, res) => {
    const {
        hostname,
        server_name = "",
        location = "",
        db_port = 3306,
        db_username,
        db_password,
        description,
    } = req.body;
    console.log(db_port);
    let sql = `
        INSERT
        OR IGNORE 
        INTO servers(hostname, serer_name, location, db_port, db_username, db_password, description)
        VALUES(?, ?, ?, ?, ?, ?, ?`;

    db.run(
        sql,
        [hostname, server_name, location, db_port, db_username, db_password, description],
        (err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(400);
            }

            res.sendStatus(200);
        }
    );
});

//Update a specific sever
router.put("/:hostname", (req, res) => {
    const {hostname} = req.params;
    const {
        new_hostname,
        server_name,
        location,
        db_port,
        db_username,
        db_password,
        description,
    } = req.body;

    //TODO make this better, if possible
    //Create update statement, only update if a value is given
    let values = [];
    let sql = "UPDATE servers SET ";
    if (new_hostname) {
        sql += "hostname = ?, ";
        values.push(new_hostname);
    }
    if (server_name) {
        sql += "server_name = ?, ";
        values.push(server_name);
    }
    if (location) {
        sql += "location = ?, ";
        values.push(location);
    }
    if (db_port) {
        sql += "db_port = ?, ";
        values.push();
    }
    if (db_username) {
        sql += "db_username = ?, ";
        values.push(db_username);
    }
    if (db_password) {
        sql += "db_password = ?, ";
        values.push(db_password);
    }
    if (description) {
        sql += "description = ?, ";
        values.push(description);
    }
    sql += "WHERE hostname = ?;";
    values.push(hostname);

    //Regex to remove the last comma in this string:
    //https://stackoverflow.com/questions/5497318/replace-last-occurrence-of-character-in-string/
    sql = sql.replace(/,([^,]*)$/, "$1");

    db.run(sql, values, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

//Deletes a specific server
router.delete("/:hostname", async (req, res) => {
    const {hostname} = req.params;
    let sql = `
        DELETE
        FROM servers
        WHERE hostname = ? `;

    db.run(sql, [hostname], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
});

module.exports = router;
