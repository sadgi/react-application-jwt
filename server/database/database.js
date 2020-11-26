const sqlite3 = require('sqlite3').verbose();

/** Used to connect to sqlite databse*/
const db = new sqlite3.Database('../server/data/database.sqlite', (err) => {
    console.log(err);
});

module.exports = db;