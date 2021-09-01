const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.port || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// // Connection Pool
// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: "localhost",
//     user: "Marcus",
//     password: "$Marcus05",
//     database: "user-management-system"
// });

// //Connect to DB
// pool.getConnection((err, connection) => {
//     if (err) throw err; // not connected
//     console.log('connected as ID' + connection.threadId)
// })


const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})