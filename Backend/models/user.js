const connection = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const User = function (user) {
  this.id_user = user.id_user;
  this.email = user.email;
  this.avatar =
    user.avatar || process.env.URL + process.env.DIR + "default.jpg";
  this.avatar_edited = user.avatar_edited || 0;
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
      } else {
        result[0].avatar = process.env.URL + process.env.DIR + result[0].avatar;
        callback(null, result[0]);
      }
    }
  );
};

User.signup = (user, hash, callback) => {
  connection.query(
    `INSERT INTO users (email, password, pseudo, date_created, date_modified) VALUES (?, ?, ?, NOW(), NOW())`,
    [user.email, hash, user.pseudo],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        user.id_user = result.insertId;
        callback(null, user);
      }
    }
  );
};
User.getUser = (id, callback) => {
  connection.query(
    `SELECT * FROM users WHERE id_user=?`,
    [id],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result[0]);
      }
    }
  );
};

User.editInfo = (user, callback) => {
  connection.query(
    `UPDATE users SET pseudo = ?, bio = ?, date_modified = NOW()  WHERE id_user = ?`,
    [user.pseudo, user.bio, user.id_user],
    (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    }
  );
};

User.editAvatar = (user, callback) => {
  const sql =
    user.avatar_edited == 0
      ? `UPDATE users SET avatar = ?, avatar_edited = 1, date_modified = NOW() WHERE id_user = ?`
      : `UPDATE users SET avatar = ? date_modified = NOW() WHERE id_user = ?`;
  connection.query(sql, [user.avatar, user.id_user], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

module.exports = User;
