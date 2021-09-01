const mysql = require('mysql');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "Marcus",
    password: "$Marcus05",
    database: "user-management-system"
});



//View Users
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('connected as ID' + connection.threadId);
        connection.query('select * from users', (err, rows) => {
            // When done with the connection ,relase it
            connection.release();
            if (!err) {
                res.render('home', { rows });
            }
            else {
                console.log(err);
            }
            console.log(rows);
        });
    });
}

//find user by search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("connected as ID " + connection.threadId);
        let searchTerm = req.body.search;
        // console.log(searchTerm);
        connection.query("select * from users where first_name like ?", ['%' + searchTerm + "%"], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
        })
    });
}

//Add new user
exports.form = (req, res) => {
    res.render('add-user');

}