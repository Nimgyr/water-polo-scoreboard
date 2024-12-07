import sqlite3 from "sqlite3";

sqlite3.verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
    "./collection.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the SQLite database.");
    }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
    // Create the competitions table if it doesn't exist
    db.run(
        `CREATE TABLE IF NOT EXISTS competitions (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Created competitions table.");
        }
    );

    // Create the teams table if it doesn't exist
    db.run(
        `CREATE TABLE IF NOT EXISTS teams (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Created teams table.");
        }
    );

    // Clear existing data in the tables
    db.run(`DELETE FROM teams`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("All rows deleted from teams.");
    });

    db.run(`DELETE FROM competitions`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("All rows deleted from competitions.");

        // Insert new data into the competitions table
        const competitionName = "Champions League";
        db.run(
            `INSERT INTO competitions (name) VALUES (?)`,
            [competitionName],
            function (err) {
                if (err) {
                    return console.error(err.message);
                }
                const competitionId = this.lastID;
                console.log(`Competition inserted with ID ${competitionId}`);

                // Insert new data into the teams table
                const teams = ["Team A", "Team B", "Team C", "Team D"];
                const insertTeamSql = `INSERT INTO teams (name) VALUES (?)`;

                teams.forEach((team) => {
                    db.run(insertTeamSql, [team], function (err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log(
                            `Team '${team}' inserted with ID ${this.lastID}`
                        );
                    });
                });

                // Close the database connection after all insertions are done
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log("Closed the database connection.");
                });
            }
        );
    });
});
