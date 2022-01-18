const dotenv = require("dotenv");
dotenv.config();
const Comment = require("../models/comment");

exports.getAllComments = async (req, res) => {
  try {
    const sql = `SELECT com.*, users.pseudo, users.avatar FROM comments com WHERE pub_id = ?
    LEFT JOIN users 
    ON users.id_user = com.author_id
    ORDER BY date_created DESC`;
    const results = await Comment.sendQuery(sql, [req.body.pub_id]);
    if (!results) {
      res.status(200).json({ message: "Pas encore de commentaires" });
    } else {
      results.forEach(
        (com) => (com.avatar = process.env.URL + process.env.DIR + com.avatar)
      );
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({
      author_id: req.body.userId,
      comment: req.body.comment,
      pub_id: req.params.id,
    });

    const sql = `INSERT INTO comments (commenter_id, pub_id, comment, date_created, date_modified) VALUES (?, ?, ?, NOW(), NOW())`;
    const result = await Comment.sendQuery(sql, [
      comment.author_id,
      comment.pub_id,
      comment.comment,
    ]);

    res
      .status(201)
      .json({ id_comment: result.insertId, message: "Commentaire publié!" });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.modifyComment = async (req, res) => {
  try {
    const comment = new Comment({
      comment: req.body.comment,
      id_comment: req.params.id,
    });
    const sql = `UPDATE comments SET comment = ?, date_modified = NOW() WHERE id_comment = ?`;
    const result = await Comment.sendQuery(sql, [
      comment.comment,
      comment.id_comment,
    ]);
    res.status(200).json({ message: "Commentaire modifié!" });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const sql = `DELETE FROM comments WHERE id_comment = ?`;
    await Comment.sendQuery(sql, [req.params.id]);
    res.status(200).json({ message: "Commentaire supprimé!" });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};
