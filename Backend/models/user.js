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

User.login = (email, callback) => {
  connection.query(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    (err, result) => {
      if (err) {
        callback(err, null);
      }
      result[0].avatar = process.env.URL + process.env.DIR + result[0].avatar;
      callback(null, result[0]);
    }
  );
};

module.exports = User;
