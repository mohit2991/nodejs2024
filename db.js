const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "db4free.net",
  user: "nodejsdb_2023",
  password: "nodejsdb_2023",
  database: "nodejsdb_2023",
});

connection.connect((err) => {
  if (err) {
    console.log("Error while connecting with database:", err);
  }

  console.log("Connected to database.");
});

module.exports = connection;
