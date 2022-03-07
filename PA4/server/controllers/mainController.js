const mysql = require("mysql");

exports.view = (req, res) => {
    res.render("main", {
        title: "Main",
        css: ["styles.css"],
        js: ["script.js"],
    });
};