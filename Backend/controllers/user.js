const bcrypt = require("bcrypt");
// const User = require("../models/user");
const jwt = require("jsonwebtoken");
const validator = require("password-validator");
const connection = require("../db");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

let schema = new validator();

schema
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

exports.signup = async (req, res, next) => {
  try {
    if (!schema.validate(req.body.password))
      throw new Error(
        "Le mot de passe doit contenir 8 caractères au minimum dont au moins une majuscule et un chiffre"
      );

    const hash = await bcrypt.hash(req.body.password, 10);
    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    await connection.query(sql, [req.body.email, hash], (err, result) => {
      if (err) throw err;
      const userId = result.insertId;
      const token = jwt.sign({ userId: userId }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      });
      res.cookie("token", token);
      res.json({ userId: userId });

      return res.status(200);
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
exports.login = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM users WHERE email = ?`;
    await connection.query(sql, [req.body.email], (err, result) => {
      console.log(result);
      if (err) throw err;
      if (!result)
        return res.status(404).json({ message: "Utilisateur non trouvé!" });
      // const valid = await bcrypt.compare(
      //   req.body.password,
      //   result[0].password
      // );
      //
      if (req.body.password !== result.password) {
        return res.status(401).json({ message: "Mot de passe incorrect !" });
      }
      result.avatar = process.env.URL + process.env.DIR + result.avatar;
      const token = jwt.sign({ userId: result.id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      });
      res.cookie("token", token);
      res.json({
        userId: result.id,
        email: result.email,
        avatar: result.avatar,
        pseudo: result.pseudo,
        bio: result.bio,
      });

      return res.status(200);
    });
  } catch (err) {
    res.status(err.statusCode).json({ err });
  }
};

exports.editInfo = async (req, res, next) => {
  try {
    const sql = `UPDATE users SET pseudo = ?, bio = ?  WHERE id = ?`;

    await connection.query(
      sql,
      [req.body.pseudo, req.body.bio, req.body.userId],
      (err) => {
        if (err) throw err;

        res.status(200).json({ message: "Profil modifié" });
      }
    );
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.editAvatar = async (req, res) => {
  try {
    const data = {
      oldAvatar: req.body.oldAvatar,
      userId: req.body.userId,
    };
    fs.unlink(data.oldAvatar, (err) => {
      if (err) throw err;
    });
    const newAvatar = req.file.filename;
    const sql = `UPDATE users SET avatar = ? WHERE id = ?`;
    await connection.query(sql, [newAvatar, data.userId], (err) => {
      if (err) throw err;

      res.status(200).json({ message: "Profil modifié" });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
