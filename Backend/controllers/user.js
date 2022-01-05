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
    const data = {
      email: req.body.email,
      password: req.body.password,
      pseudo: req.body.pseudo,
    };
    if (!schema.validate(data.password))
      throw new Error(
        "Le mot de passe doit contenir 8 caractères au minimum dont au moins une majuscule et un chiffre"
      );

    const hash = await bcrypt.hash(data.password, 10);
    const sql = `INSERT INTO users (email, password, pseudo, date_created, date_modified) VALUES (?, ?, ?, NOW(), NOW())`;
    await connection.query(
      sql,
      [data.email, hash, data.pseudo],
      (err, result) => {
        if (err) throw err;
        const userId = result.insertId;
        const token = jwt.sign({ userId: userId }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        });
        res.cookie("token", token);
        res.json({ userId: userId, message: "Compte créé avec succès!" });

        return res.status(200);
      }
    );
  } catch (err) {
    res.status(400).json({ err });
  }
};
exports.login = async (req, res, next) => {
  try {
    const sql = `SELECT id_user, email, avatar, pseudo, bio FROM users WHERE email = ?`;
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
      if (req.body.password != result[0].password) {
        return res.status(401).json({ message: "Mot de passe incorrect !" });
      }
      result[0].avatar = process.env.URL + process.env.DIR + result[0].avatar;
      const token = jwt.sign(
        { userId: result[0].id_user },
        "RANDOM_TOKEN_SECRET",
        {
          expiresIn: "24h",
        }
      );
      res.cookie("token", token);
      res.json({
        result,
      });

      return res.status(200);
    });
  } catch (err) {
    res.status(err.statusCode).json({ err });
  }
};

exports.editInfo = async (req, res, next) => {
  try {
    const data = {
      pseudo: req.body.pseudo,
      bio: req.body.bio,
      userId: req.body.userId,
    };

    if (data.pseudo && data.bio) {
      const sql = `UPDATE users SET pseudo = ?, bio = ?, date_modified = NOW()  WHERE id_user = ?`;
      const values = [data.pseudo, data.bio, data.userId];
    } else if (data.pseudo) {
      const sql = `UPDATE users SET pseudo = ?, date_modified = NOW()  WHERE id_user = ?`;
      const values = [data.pseudo, data.userId];
    } else if (data.bio) {
      const sql = `UPDATE users SET bio = ?, date_modified = NOW()  WHERE id_user = ?`;
      const values = [data.bio, data.userId];
    }

    await connection.query(sql, values, (err) => {
      if (err) throw err;

      res.status(200).json({ message: "Profil modifié" });
    });
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

    if (data.oldAvatar) {
      fs.unlink(data.oldAvatar, (err) => {
        if (err) throw err;
      });
    }
    const newAvatar = req.file.filename;
    const sql = `UPDATE users SET avatar = ? WHERE id_user = ?`;
    await connection.query(sql, [newAvatar, data.userId], (err) => {
      if (err) throw err;

      res.status(200).json({ message: "Profil modifié" });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
