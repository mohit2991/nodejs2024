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
};

module.exports = userModel;
