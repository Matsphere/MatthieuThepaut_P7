const dotenv = require("dotenv");
const connection = require("../db");
dotenv.config();

exports.getAllComments = async (req, res) => {
  try {
    const sql = `SELECT com.*, users.pseudo, users.avatar FROM comments com WHERE pub_id = ?
    LEFT JOIN users 
    ON users.id_user = com.author_id
    ORDER BY date_created DESC`;
    await connection.query(sql, [req.body.publicationId], (err, results) => {
      if (err) throw err;
      if (!results) {
        res.status(200).json({ message: "Pas encore de commentaires" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.createComment = async (req, res) => {
  try {
    const data = {
      userId: req.body.userId,
      comment: req.body.text,
    };

    const sql = `INSERT INTO comments (commenter_id, pub_id, comment, date_created, date_modified) VALUES (?, ?, ?, NOW(), NOW())`;
    await connection.query(
      sql,
      [data.userId, req.params.id, data.comment],
      (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: "Commentaire publié!" });
      }
    );
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.modifyComment = async (req, res) => {
  try {
    const data = req.body.text;
    const sql = `UPDATE comments SET comment = ?, date_modified = NOW() WHERE id_comment = ?`;
    await connection.query(sql, [data, req.params.id], (err) => {
      if (err) throw err;
      res.status(200).json({ message: "Commentaire modifié!" });
    });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const sql = `DELETE FROM comments WHERE id_comment = ?`;
    await connection.query(sql, [req.params.id], (err) => {
      if (err) throw err;
      res.status(200).json({ message: "Commentaire supprimé!" });
    });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};
