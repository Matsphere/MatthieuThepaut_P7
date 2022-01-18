const connection = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const User = function (user) {
  this.id_user = user.id_user;
  this.email = user.email;
  this.avatar =
    user.avatar || process.env.URL + process.env.DIR + "default.jpeg";
  this.pseudo = user.pseudo;
  this.bio = user.bio;
  this.is_admin = user.is_admin || 0;
  this.is_active = user.is_active || 1;
};

User.sendQuery = (sql, values) => {
  return connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return result;
  });
};

module.exports = User;
