require("dotenv").config();

// let CONFIG = {};

// CONFIG.app = process.env.APP || "development";
// CONFIG.PORT = process.env.PORT || "3000";
// CONFIG.db_dialect = process.env.DB_DIALECT || "mysql";
// CONFIG.db_host      = process.env.DB_HOST       || "localhost";
// CONFIG.db_port      = process.env.DB_PORT       || "3306";
// CONFIG.db_name      = process.env.DB_NAME       || "catatan_po";
// CONFIG.db_user      = process.env.DB_USER       || "root";
// CONFIG.db_password  = process.env.DB_PASSWORD   || "password";

// module.exports = CONFIG;

var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "catatan_po",
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;