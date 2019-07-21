const mysql = require('mysql');

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'ongc'
});


conn.connect((err) => {
    if(err) throw err;
    console.log('Connected to the database');
});


module.exports = conn;