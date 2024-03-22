const mysql = require("mysql2");
require("dotenv").config();

const { DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOSTNAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.log("Error while connecting with database:", err);
  }

  console.log("Connected to database.");
});

module.exports = connection;
