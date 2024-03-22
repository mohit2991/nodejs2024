const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db"); // import db

const app = express();

// Add body parser as middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const params = req.query;
  res.json({ status: true, message: "Welcome!" });
});

app.get("/get-all-users", (req, res) => {
  const query = "SELECT * FROM users LIMIT 0, 2";

  connection.query(query, (error, result)=> {
    if (error) {
      console.error("error", error);
      res.status(500).json({ status: false, message: error.message });
    } else {
      res.status(200).json({
        status: true,
        data: result,
        message: "User List.",
      });
    }
  })
});

app.post("/signup", function (req, res) {
  const params = req.body;
  console.log(params);
  const { name, email, phone, password } = params; // Object Destructuring

  const query = `INSERT INTO users (name, email, phone, password) values (?, ?, ?, ?)`;
  connection.query(query, [name, email, phone, password], (error) => {
    if (error) {
      console.error("error", error);
      res.status(500).json({ status: false, message: error.message });
    } else {
      res.status(200).json({
        status: true,
        message: "User registered successfully!",
      });
    }
  });
});

const PORT = 8000;
app.listen(PORT, function () {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
