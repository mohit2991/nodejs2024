const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./src/config/db"); // import db

const routers = require("./src/routes/routers");

const app = express();

// Add body parser as middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routers);

const PORT = 8000;
app.listen(PORT, function () {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
