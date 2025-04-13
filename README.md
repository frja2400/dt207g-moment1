## Moment 1 - DT207G

Denna serverbaserade webbapplikation skapades med express, ejs, dotenv och sqlite3. 

Jag började med att skapa ett nytt projekt med npm init -y och sedan installerade jag express, ejs och sqlite3.
Sedan så skapade jag en gitignore-fil och en install-fil. I install.js så skapade jag min databas och min tabell. 
Här så installerade jag även dotenv och skapade en .env-fil som jag också adderade i min gitignore. 

Jag skapade min db-mapp och körde node install. Min databas adderade jag också i min gitignore-fil.
Här skapade jag alla mina ejs-filer och mappar som jag behövde och började koda min server.js. I min server.js så importerade jag moduler, anslöt till databas, gjorde routing och startade applikationen. I terminalen så körde jag node server. 

I min server.js samt mina ejs-filer så kodade jag applikationens syfte och funktion. Jag skapar också ett ER-diagram över min tabell. Slutresultatet blev en webbapplikation som kan lagra kurser via ett formulär i en databas samt skriva ut och radera dessa till webbapplikationen.
