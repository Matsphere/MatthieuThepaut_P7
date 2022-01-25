const dotenv = require("dotenv");
dotenv.config();
const Comment = require("../models/comment");

exports.getAllComments = async (req, res) => {
  try {
    Comment.getAllComments(req.body.pub_id, (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json(results);
    });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({
      author_id: req.body.id_user,
      comment: req.body.comment,
      pub_id: req.params.id,
    });

    Comment.createComment(comment, (err, comment) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(201).json(comment);
    });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.modifyComment = async (req, res) => {
  try {
    Comment.modifyComment(req.params.id, req.body.comment, (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({ message: "Commentaire modifié!" });
    });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    Comment.deleteComment(req.params.id, (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({ message: "Commentaire supprimé!" });
    });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};
