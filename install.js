//Importerar SQLite-databasen och aktiverar detaljerad inloggning med verbose.
const sqlite3 = require("sqlite3").verbose();

//Skapa databas
const db = new sqlite3.Database("./db/courses.db");

//Skapa tabell. Seralize säkerställer att kommandona exekveras i den ordning de skrivs.
db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coursecode VARCHAR(50) UNIQUE,
        coursename VARCHAR(80),
        syllabus VARCHAR(255),
        progression CHAR(1)
  );
    `);
});

db.close();