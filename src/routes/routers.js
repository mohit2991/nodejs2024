const express = require("express");
const router = express.Router();

const userController = require("./../controllers/userController");

router.get("/", function (req, res) {       
  res.json({ status: true, message: "Welcome!" });
});

router.post("/signup", userController.register);

router.post("/login", userController.login);

module.exports = router;
