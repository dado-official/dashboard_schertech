const sqlite3 = require("sqlite3").verbose();
const DB_PATH = process.env.DB_PATH;

const db = new sqlite3.Database(DB_PATH);
db.run("PRAGMA foreign_keys = ON;");

module.exports = db;