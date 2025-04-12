//Importerar alla moduler jag behöver
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
//Ladda miljövariabler från .env
require('dotenv').config();

//Skapar en anslutning till databasen
const db = new sqlite3.Database(process.env.DB_PATH); // Använd miljövariabel för databas-URL


//Inställningar
const app = express();                                          //Skapar en ny express-applikation
const port = process.env.PORT || 3000;                          // Använd miljövariabel för port
app.set("view engine", "ejs");                                  //Anger ejs som templating engine
app.use(express.static("public"));                              //Konfigurerar Express att använda statiska filer från public-mappen.
app.use(bodyParser.urlencoded({ extended: true }));             //Använder body-parser för att hantera URL-encoded data.

//Routing
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/courses", (req, res) => {
    res.render("courses");
});

app.post("/courses", (req, res) => {
    let coursecode = req.body.coursecode;
    let coursename = req.body.coursename;
    let syllabus = req.body.syllabus;
    let progression = req.body.progression;

    let error = "";

    //Kontrollera input
    if (coursecode != "" && coursename != "" && syllabus != "" && progression != "") {
        //Korrekt - lagra i db
        const statement = db.prepare("INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES(?, ?, ?, ?)");
        statement.run(coursecode, coursename, syllabus, progression);
        statement.finalize();
    } else {
        error = "Du måste fylla i alla fält."
    }

    res.redirect("/");
});

app.get("/about", (req, res) => {
    res.render("about");
});

//Starta applikationen.
//Startar servern och lyssnar på den angivna porten (3000). Loggar ett meddelande när servern har startat.
app.listen(port, () => {
    console.log("Application started on port: " + port);
});