const connection = require("../db");

const Comment = function (comment) {
  this.id_comment = comment.id_comment;
  this.author_id = comment.author_id;
  this.pub_id = comment.pub_id;
  this.comment = comment.comment;
};

Comment.getAllComments = (id, callback) => {
  connection.query(
    `SELECT com.id_comment, com.author_id, com.pub_id, com.comment, DATE_FORMAT(com.date_created, '%H:%i - %d/%m/%Y') AS date_created, DATE_FORMAT(com.date_modified, '%H:%i - %d/%m/%Y') AS date_modified, users.pseudo, users.avatar FROM comments com 
   LEFT JOIN users 
   ON users.id_user = com.author_id
   WHERE pub_id = ?
   ORDER BY date_created DESC`,
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        results.forEach((com) => {
          com.avatar = process.env.URL + process.env.DIR + com.avatar;
        });
        callback(null, results);
      }
    }
  );
};

Comment.createComment = (comment, callback) => {
  connection.query(
    `INSERT INTO comments (author_id, pub_id, comment, date_created, date_modified) VALUES (?, ?, ?, NOW(), NOW())`,
    [comment.author_id, comment.pub_id, comment.comment],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        comment.id_comment = result.insertId;

        callback(null, comment);
      }
    }
  );
};

Comment.modifyComment = (id, comment, callback) => {
  connection.query(
    `UPDATE comments SET comment = ?, date_modified = NOW() WHERE id_comment = ?`,
    [comment, id],
    (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    }
  );
};

Comment.deleteComment = (id, callback) => {
  connection.query(`DELETE FROM comments WHERE id_comment = ?`, [id], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

module.exports = Comment;
