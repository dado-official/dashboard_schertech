CREATE TABLE "custom_entries" (
	"entry_id"	INTEGER NOT NULL,
	"title"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"frequency"	INTEGER NOT NULL,
	"target_value"	REAL NOT NULL,
	"entry_date"	INTEGER NOT NULL,
	PRIMARY KEY("entry_id" AUTOINCREMENT)
);

CREATE TABLE "custom_values" (
	"value_id"	INTEGER NOT NULL,
	"entry_id"	INTEGER NOT NULL,
	"value"	REAL NOT NULL,
	"value_date"	INTEGER NOT NULL,
	FOREIGN KEY("entry_id") REFERENCES "custom_entries"("entry_id") ON DELETE CASCADE,
	PRIMARY KEY("value_id" AUTOINCREMENT)
);

CREATE TABLE "repositories" (
	"id"	INTEGER,
	"workspace"	BLOB NOT NULL,
	"repo_slug"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"description"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "servers" (
	"hostname"	TEXT NOT NULL,
	"server_name"	TEXT,
	"db_port"	INTEGER NOT NULL DEFAULT 3306,
	"db_username"	TEXT NOT NULL,
	"db_password"	TEXT,
	"location"	TEXT,
	"description"	TEXT,
	PRIMARY KEY("hostname")
);