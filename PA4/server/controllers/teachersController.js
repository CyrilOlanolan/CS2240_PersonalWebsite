const mysql = require("mysql");

// MYSQL CONNECTION POOL
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// VIEW TEACHER
exports.view = (req, res) => {
    // CONNECT TO DATABASE
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query("SELECT * FROM teachers", (err, rows) => {
            // WHEN DONE WITH CONNECTION, RELEASE IT
            connection.release();
            let message = req.flash();
            res.render("teachers", {
                title: "Teachers",
                css: ["styles.css"],
                js: ["script.js"],
                rows,
                message: message,
            });
        });
    });
};

// FIND TEACHER
exports.find = (req, res) => {
    // CONNECT TO DATABASE
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED

        //console.log("Connected! ID: " + connection.threadId);

        let searchTerm = req.body.search;

        // USE THE CONNECTION
        connection.query("SELECT * FROM teachers WHERE (teacherFirstName LIKE ?)", ["%" + searchTerm + "%"], (err, rows) => {
            // WHEN DONE WITH CONNECTION, RELEASE IT
            connection.release();

            res.render("teachers", {
                title: "Teachers",
                css: ["styles.css"],
                js: ["script.js"],
                rows,
            });
        });
    });
};

// ADD TEACHER FORM
exports.add = (req, res) => {
    res.render("add_teacher", {
        title: "Teachers: Add a Teacher",
        css: ["styles.css"],
        js: ["script.js"],
    });
};

// ADD NEW TEACHER
exports.submit = (req, res) => {
    // CONNECT TO DATABASE
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED
        const { teacherLastName, teacherFirstName, teacherMiddleName } = req.body;

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query(
            "INSERT INTO teachers SET teacherLastName = ?, teacherFirstName = ?, teacherMiddleName = ?",
            [teacherLastName, teacherFirstName, teacherMiddleName],
            (err, rows) => {
                // WHEN DONE WITH CONNECTION, RELEASE IT
                connection.release();

                if (!err) {
                    res.render("add_teacher", {
                        title: "Teachers: Add a Teacher",
                        css: ["styles.css"],
                        js: ["script.js"],
                        alert: "Teacher added successfully!",
                    });
                } else console.log(err);
            }
        );
    });
};

// UPDATE TEACHER DETAILS
exports.update = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED;
        const { teacherLastName, teacherFirstName, teacherMiddleName } = req.body;

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query(
            "UPDATE teachers SET teacherLastName = ?, teacherFirstName = ?, teacherMiddleName = ? WHERE teacherID = ?",
            [teacherLastName, teacherFirstName, teacherMiddleName, req.params.id],
            (err, rows) => {
                // WHEN DONE WITH CONNECTION, RELEASE IT
                connection.release();

                if (!err) {
                    // SECOND QUERY
                    pool.getConnection((error, connection) => {
                        if (error) throw error; // NOT CONNECTED

                        //console.log("Connected! ID: " + connection.threadId);

                        // USE THE CONNECTION
                        connection.query("SELECT * FROM teachers WHERE teacherID = ?", [req.params.id], (err, rows) => {
                            // WHEN DONE WITH CONNECTION, RELEASE IT
                            connection.release();

                            if (!err) {
                                req.flash("success", `${teacherFirstName} ${teacherLastName} has been updated successfully!`)
                                res.redirect("/teachers");
                            } else console.log(err);
                        });
                    });
                } else console.log(err);
            }
        );
    });
};


// DELETE TEACHER
exports.delete = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query("DELETE FROM teachers WHERE teacherID = ?", [req.params.id], (err, rows) => {
            // WHEN DONE WITH CONNECTION, RELEASE IT
            connection.release();

            if (!err) {
                res.redirect('/teachers')
            } else console.log(err);
        });
    });
};