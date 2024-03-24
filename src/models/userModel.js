const connection = require("./../config/db");
const userModel = {
  register: (params, callBack) => {
    const { name, email, phone, password } = params; // Object Destructuring

    const query = `INSERT INTO users (name, email, phone, password) values (?, ?, ?, ?)`;
    connection.query(query, [name, email, phone, password], (error, result) => {
      if (error) {
        return callBack(error);
      }

      return callBack(false, result);
    });
  },

  login: (params, callBack) => {
    const { email } = params; // Object Destructuring

    const query = `SELECT email, password from users where email = ?`;
    connection.query(query, [email], (error, result) => {
      if (error) {
        return callBack(error);
      }

      return callBack(false, result);
    });
  },
};

module.exports = userModel;
