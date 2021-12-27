const fs = require("fs");
const dotenv = require("dotenv");
const connection = require("../db");
dotenv.config();

exports.getAllPublications = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM publications`;
    await connection.query(sql, (err, result) => {
      if (err) throw err;

      res.status(200).json(result);
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOnePublication = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM publications WHERE id = ?`;
    await connection.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;

      res.status(200).json(result);
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.createPublication = async (req, res, next) => {
  try {
    const sql = `INSERT INTO publications (author_id, text, date) VALUES (?, ?, NOW())`;
    await connection.query(sql, [req.body.userId, req.body.text], (err) => {
      if (err) throw err;

      res.status(200).json({ message: "Publication créée" });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.modifyPublication = async (req, res, next) => {
  try {
    const sql = `UPDATE publications SET text = ? WHERE id = ?`;
    await connection.query(sql, [req.body.text, req.params.id], (err) => {
      if (err) throw err;

      res.status(200).json({ message: "Publication modifiée" });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.deletePublication = async (req, res, next) => {
  try {
    const sql = `DELETE FROM publications  WHERE id = ?`;
    await connection.query(sql, [req.params.id], (err) => {
      if (err) throw err;

      res.status(200).json({ message: "Publication supprimée" });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
