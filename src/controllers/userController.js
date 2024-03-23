const userModel = require("./../models/userModel");

const userController = {
  register: (req, res) => {
    const params = req.body;

    // call model
    userModel.register(params, (error, result) => {
      if (error) {
        return res.status(500).json({ status: false, message: error.message });
      }

      return res.status(200).json({
        status: true,
        message: "User registered successfully!",
      });
    });
  },
};

module.exports = userController;
