const mysql = require("mysql");

// MYSQL CONNECTION POOL
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// VIEW STUDENTS
exports.view = (req, res) => {
    // CONNECT TO DATABASE
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query("SELECT * FROM students", (err, rows) => {
            // WHEN DONE WITH CONNECTION, RELEASE IT
            connection.release();
            let message = req.flash();
            res.render("students", {
                title: "Students",
                css: ["styles.css"],
                js: ["script.js"],
                rows,
                message: message,
            });
        });
    });
};

// FIND STUDENT
exports.find = (req, res) => {
    // CONNECT TO DATABASE
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED

        //console.log("Connected! ID: " + connection.threadId);

        let searchTerm = req.body.search;

        // USE THE CONNECTION
        connection.query("SELECT * FROM students WHERE (studentFirstName LIKE ?)", ["%" + searchTerm + "%"], (err, rows) => {
            // WHEN DONE WITH CONNECTION, RELEASE IT
            connection.release();

            res.render("students", {
                title: "Students",
                css: ["styles.css"],
                js: ["script.js"],
                rows,
            });
        });
    });
};

// ADD STUDENT FORM
exports.add = (req, res) => {
    res.render("add_student", {
        title: "Students: Add a Student",
        css: ["styles.css"],
        js: ["script.js"],
    });
};

// ADD NEW STUDENT
exports.submit = (req, res) => {
    // CONNECT TO DATABASE
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED
        const { studentLastName, studentFirstName, studentMiddleName } = req.body;

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query(
            "INSERT INTO students SET studentLastName = ?, studentFirstName = ?, studentMiddleName = ?",
            [studentLastName, studentFirstName, studentMiddleName],
            (err, rows) => {
                // WHEN DONE WITH CONNECTION, RELEASE IT
                connection.release();

                if (!err) {
                    res.render("add_student", {
                        title: "Students: Add a Student",
                        css: ["styles.css"],
                        js: ["script.js"],
                        alert: "Student added successfully!",
                    });
                } else console.log(err);
            }
        );
    });
};

// UPDATE STUDENT DETAILS
exports.update = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED;
        const { studentLastName, studentFirstName, studentMiddleName } = req.body;

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query(
            "UPDATE students SET studentLastName = ?, studentFirstName = ?, studentMiddleName = ? WHERE studentID = ?",
            [studentLastName, studentFirstName, studentMiddleName, req.params.id],
            (err, rows) => {
                // WHEN DONE WITH CONNECTION, RELEASE IT
                connection.release();

                if (!err) {
                    // SECOND QUERY
                    pool.getConnection((error, connection) => {
                        if (error) throw error; // NOT CONNECTED

                        //console.log("Connected! ID: " + connection.threadId);

                        // USE THE CONNECTION
                        connection.query("SELECT * FROM students WHERE studentID = ?", [req.params.id], (err, rows) => {
                            // WHEN DONE WITH CONNECTION, RELEASE IT
                            connection.release();

                            if (!err) {
                                req.flash("success", `${studentFirstName} ${studentLastName} has been updated successfully!`)
                                res.redirect("/students");
                            } else console.log(err);
                        });
                    });
                } else console.log(err);
            }
        );
    });
};


// DELETE STUDENT
exports.delete = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query("DELETE FROM students WHERE studentID = ?", [req.params.id], (err, rows) => {
            // WHEN DONE WITH CONNECTION, RELEASE IT
            connection.release();

            if (!err) {
                res.redirect('/students')
            } else console.log(err);
        });
    });
};