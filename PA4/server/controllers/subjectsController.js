const mysql = require("mysql");

// MYSQL CONNECTION POOL
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// VIEW SUBJECT
exports.view = (req, res) => {
    // CONNECT TO DATABASE
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query("SELECT * FROM subjects", (err, rows) => {
            // WHEN DONE WITH CONNECTION, RELEASE IT
            connection.release();

            res.render("subjects", {
                title: "Subjects",
                css: ["styles.css"],
                js: ["script.js"],
                rows,
            });
        });
    });
};

// FIND SUBJECT
exports.find = (req, res) => {
    // CONNECT TO DATABASE
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED

        //console.log("Connected! ID: " + connection.threadId);

        let searchTerm = req.body.search;

        // USE THE CONNECTION
        connection.query("SELECT * FROM subjects WHERE (subjectTitle LIKE ?)", ["%" + searchTerm + "%"], (err, rows) => {
            // WHEN DONE WITH CONNECTION, RELEASE IT
            connection.release();

            res.render("subjects", {
                title: "Subjects",
                css: ["styles.css"],
                js: ["script.js"],
                rows,
            });
        });
    });
};

// ADD SUBJECT FORM
exports.add = (req, res) => {
    res.render("add_subject", {
        title: "Subjects: Add a Subject",
        css: ["styles.css"],
        js: ["script.js"],
    });
};

// ADD NEW SUBJECT
exports.submit = (req, res) => {
    // CONNECT TO DATABASE
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED
        const { subjectTitle, subjectNo, transcriptLoad, payingLoad, teachingLoad } = req.body;

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query(
            "INSERT INTO subjects SET subjectTitle = ?, subjectNo = ?, transcriptLoad = ?, payingLoad = ?, teachingLoad = ?",
            [subjectTitle, subjectNo, transcriptLoad, payingLoad, teachingLoad],
            (err, rows) => {
                // WHEN DONE WITH CONNECTION, RELEASE IT
                connection.release();

                if (!err) {
                    res.render("add_subject", {
                        title: "Subjects: Add a Subject",
                        css: ["styles.css"],
                        js: ["script.js"],
                        alert: "Subject added successfully!",
                    });
                } else console.log(err);
            }
        );
    });
};

// UPDATE SUBJECT FORM
exports.edit = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query("SELECT * FROM subjects WHERE subjectID = ?", [req.params.id], (err, rows) => {
            // WHEN DONE WITH CONNECTION, RELEASE IT
            connection.release();

            if (!err) {
                res.render("update_subject", {
                    title: "Subjects: Update Subject Details",
                    css: ["styles.css"],
                    js: ["script.js"],
                    rows,
                });
            } else console.log(err);
        });
    });
};

// UPDATE SUBJECT DETAILS
exports.update = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED;
        const { subjectTitle, subjectNo, transcriptLoad, payingLoad, teachingLoad } = req.body;

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query(
            "UPDATE subjects SET subjectTitle = ?, subjectNo = ?, transcriptLoad = ?, payingLoad = ?, teachingLoad = ? WHERE subjectID = ?",
            [subjectTitle, subjectNo, transcriptLoad, payingLoad, teachingLoad, req.params.id],
            (err, rows) => {
                // WHEN DONE WITH CONNECTION, RELEASE IT
                connection.release();

                if (!err) {
                    // SECOND QUERY
                    pool.getConnection((error, connection) => {
                        if (error) throw error; // NOT CONNECTED

                        //console.log("Connected! ID: " + connection.threadId);

                        // USE THE CONNECTION
                        connection.query("SELECT * FROM subjects WHERE subjectID = ?", [req.params.id], (err, rows) => {
                            // WHEN DONE WITH CONNECTION, RELEASE IT
                            connection.release();

                            if (!err) {
                                res.render("update_subject", {
                                    title: "Subjects: Update Subject Details",
                                    css: ["styles.css"],
                                    js: ["script.js"],
                                    alert: `${subjectTitle} has been updated successfully!`,
                                    rows,
                                });
                            } else console.log(err);
                        });
                    });
                } else console.log(err);
            }
        );
    });
};


// DELETE SUBJECT
exports.delete = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // NOT CONNECTED

        //console.log("Connected! ID: " + connection.threadId);

        // USE THE CONNECTION
        connection.query("DELETE FROM subjects WHERE subjectID = ?", [req.params.id], (err, rows) => {
            // WHEN DONE WITH CONNECTION, RELEASE IT
            connection.release();

            if (!err) {
                res.redirect('/subjects')
            } else console.log(err);
        });
    });
};