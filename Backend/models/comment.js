const connection = require("../db");

const Comment = function (comment) {
  this.id_comment = comment.id_comment;
  this.author_id = comment.author_id;
  this.pub_id = comment.pub_id;
  this.comment = comment.comment;
};

Comment.sendQuery = (sql, values) => {
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return result;
  });
};

module.exports = Comment;
