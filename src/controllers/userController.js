const userModel = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

require("dotenv").config();

const userController = {
  register: async (req, res) => {
    const params = req.body;
    const { password, email } = params; // Object Destructuring

    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
      });

      const validateEmail = schema.validate({ email });
      if (validateEmail.error) {
        console.error(validateEmail.error.details[0].message);
        return res.status(500).json({
          status: false,
          message: validateEmail.error.details[0].message,
        });
      }

      // bcrypt - To genrate encripte password - hash password
      const hashPassword = await bcrypt.hash(password, 12);

      if (hashPassword) {
        // Replace password with hash password
        params.password = hashPassword;

        // call model
        userModel.register(params, (error) => {
          if (error) {
            return res
              .status(500)
              .json({ status: false, message: error.message });
          }

          return res.status(200).json({
            status: true,
            message: "User registered successfully!",
          });
        });
      }
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },

  login: (req, res) => {
    try {
      const params = req.body;
      const { password } = params; // Object Destructuring

      userModel.login(params, async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ status: false, message: error.message });
        }

        if (result.length === 0) {
          return res
            .status(400)
            .json({ status: false, message: "Invalid email!" });
        }

        const passwordAuthenticate = await bcrypt.compare(
          password,
          result[0].password
        );

        if (passwordAuthenticate) {
          // JWT Payload
          const tokenPayload = {
            email: params.email,
          };

          // JWT access token
          const token = jwt.sign(tokenPayload, process.env.SERCRET_KEY);

          return res.status(200).json({
            status: true,
            token: token,
            message: "Login successfully!",
          });
        } else {
          return res
            .status(400)
            .json({ status: false, message: "Wrong Pawword!" });
        }
      });
    } catch (error) {
      console.log(">>>>>>>> mohit error", error);
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = userController;
