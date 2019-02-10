const dbConfig = require('./sequelize.config').getDefaultConfig();
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
});

con.connect(function (err) {
    if (err) throw err;
});

module.exports = con;
