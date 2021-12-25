const fs = require("fs");
const dotenv = require("dotenv");
const connection = require("../db");
dotenv.config();

exports.getAllPublications = async (req, res, next) => {
  try {
    await connection.query(`SELECT * FROM publications`, (err, result) => {
      if (err) throw err;

      res.status(200).json(result);
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOnePublication = async (req, res, next) => {
  try {
    await connection.query(
      `SELECT * FROM publications WHERE id===req.parmas.id`,
      (err, result) => {
        if (err) throw err;

        res.status(200).json(result);
      }
    );
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.createPublication = async (req, res, next) => {
  try {
    await connection.query(
      `INSERT INTO publications (author_id, text, date) VALUES (req.body.userId, req.body.text, Date.now())`,
      (err) => {
        if (err) throw err;

        res.status(200).json({ message: "Publication créée" });
      }
    );
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.modifyPublication = async (req, res, next) => {
  try {
    await connection.query(
      `UPDATE publications SET text = req.body.text WHERE id === req.params.id`,
      (err) => {
        if (err) throw err;

        res.status(200).json({ message: "Publication modifiée" });
      }
    );
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.deletePublication = async (req, res, next) => {
  try {
    await connection.query(
      `DELETE FROM publications  WHERE id === req.params.id`,
      (err) => {
        if (err) throw err;

        res.status(200).json({ message: "Publication supprimée" });
      }
    );
  } catch (err) {
    res.status(400).json({ err });
  }
};
