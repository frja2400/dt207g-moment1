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
    //Denna rad kör en SQL-fråga som hämtar alla rader från tabellen courses.
    db.all("SELECT * FROM courses;", (err, rows) => {
        //Här kontrolleras om det uppstod ett fel när SQL-frågan kördes.
        if (err) {
            console.error(err.message);
        }
        //Denna rad renderar "index.ejs"-filen och skickar med ett objekt med data till vyn.
        res.render("index", {
            //Här skickas en tom sträng som värde för "error"-nyckeln i objektet som skickas till vyn.
            error: "",
            rows: rows
        });
    });
});

//Radera inlägg
app.get("/delete/:id", (req, res) => {
    let id = req.params.id;

    db.run("DELETE FROM courses WHERE id=?;", id, (err) => {
        if (err) {
            console.error(err.message);
        }

        //Redirect till startsida
        res.redirect("/");
    });
});

//Skickar med tomma värden för att undvika fel då jag vill att ifyllda värden ska stå kvar om man missat ett fält.
app.get("/courses", (req, res) => {
    res.render("courses", {
        error: "",
        values: {
            coursecode: "",
            coursename: "",
            syllabus: "",
            progression: ""
        }
    });
});

app.post("/courses", (req, res) => {
    //Tar bort onödiga mellanslag
    const coursecode = (req.body.coursecode || "").trim();
    const coursename = (req.body.coursename || "").trim();
    const syllabus = (req.body.syllabus || "").trim();
    const progression = (req.body.progression || "").trim();

    let error = "";

    //Kontrollera input
    //Validera progression specifikt
    const validProgressions = ["A", "B", "C"];

    if (
        coursecode &&
        coursename &&
        syllabus &&
        validProgressions.includes(progression)
    ) {
        const statement = db.prepare("INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES(?, ?, ?, ?)");
        statement.run(coursecode, coursename, syllabus, progression, function (err) {
            if (err) {
                //Kontrollera om kurskoden är unik.
                if (err.message.includes("UNIQUE constraint failed")) {
                    error = "Kurskoden finns redan. Välj en annan.";
                } else {
                    error = "Ett fel inträffade.";
                    console.error(err);
                }
                //Visa formuläret igen med felmeddelande och redan ifyllda värden.
                return res.render("courses", {
                    error,
                    values: { coursecode, coursename, syllabus, progression }
                });
            }
            statement.finalize();
            res.redirect("/");
        });
    } else {
        res.render("courses", {
            error: "Du måste fylla i alla fält.",
            values: { coursecode, coursename, syllabus, progression }
        });
    }
});

app.get("/about", (req, res) => {
    res.render("about");
});

//Starta applikationen.
//Startar servern och lyssnar på den angivna porten (3000). Loggar ett meddelande när servern har startat.
app.listen(port, () => {
    console.log("Application started on port: " + port);
});