// IMPORTS
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const flash = require("express-flash");
const session = require("express-session")
const PORT = process.env.PORT || 5000;

require("dotenv").config();

// PARSING MIDDLEWARE
// PARSE APPLICATION/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// PARSE APPLICATION/JSON
app.use(bodyParser.json());

// STATIC FILES
app.use(express.static("public"));

// SET ENGINE
app.engine(
    ".hbs",
    exphbs.engine({
        defaultLayout: "index",
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
        extname: ".hbs",
    })
);
app.set("view engine", ".hbs");

app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}));
app.use(flash());

// MYSQL CONNECTION POOL
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
})

// CONNECT TO DATABASE
pool.getConnection((error, connection) => {
    if (error) throw error; // NOT CONNECTED;
    
    // console.log("Connected! ID: " + connection.threadId);
})

// ROUTER
app.use("/", require("./server/routes/main"));
app.use("/students", require("./server/routes/students"));
app.use("/teachers", require("./server/routes/teachers"));
app.use("/subjects", require("./server/routes/subjects"));

// LISTEN TO PORT
app.listen(PORT, (error) => {
    if (error) console.log("Error occured: ", error);
    else console.log("Success! Listening on port: ", PORT);
});
