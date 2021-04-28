const sqlite3 = require("sqlite3").verbose();
const DB_PATH = process.env.DB_PATH || "src/database/dashboard.db";

const db = new sqlite3.Database(DB_PATH);
db.run("PRAGMA foreign_keys = ON;");

module.exports = db;