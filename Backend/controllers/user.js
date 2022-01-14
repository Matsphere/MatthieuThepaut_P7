const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("password-validator");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const User = require("../models/user");

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
    const user = new User({
      email: req.body.email,
      pseudo: req.body.pseudo,
    });
    const sql = `INSERT INTO users (email, password, pseudo, date_created, date_modified) VALUES (?, ?, ?, NOW(), NOW())`;
    const result = await User.sendQuery(sql, [user.email, hash, user.pseudo]);
    const userId = result.insertId;
    const token = jwt.sign({ userId: userId }, "RANDOM_TOKEN_SECRET", {
      expiresIn: "24h",
    });
    res.cookie("token", token);
    res.json({ userId: userId, ...user, message: "Compte créé avec succès!" });

    return res.status(200);
  } catch (err) {
    res.status(400).json({ err });
  }
};
exports.login = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const result = await User.sendQuery(sql, [req.body.email]);
    if (!result)
      return res.status(404).json({ message: "Utilisateur non trouvé!" });

    const valid = await bcrypt.compare(req.body.password, result[0].password);
    if (!valid) {
      return res.status(401).json({ message: "Mot de passe incorrect !" });
    }

    result[0].avatar = process.env.URL + process.env.DIR + result[0].avatar;
    const user = new User(result[0]);

    const token = jwt.sign({ userId: user.id_user }, "RANDOM_TOKEN_SECRET", {
      expiresIn: "24h",
    });
    res.cookie("token", token);
    res.json({
      ...user,
    });

    return res.status(200);
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.editInfo = async (req, res, next) => {
  try {
    const user = new User({
      pseudo: req.body.pseudo,
      bio: req.body.bio,
      id_user: req.body.userId,
    });
    let sql = "";
    let values = [];

    if (data.pseudo && data.bio) {
      sql = `UPDATE users SET pseudo = ?, bio = ?, date_modified = NOW()  WHERE id_user = ?`;
      values = [user.pseudo, user.bio, user.id_user];
    } else if (data.pseudo) {
      sql = `UPDATE users SET pseudo = ?, date_modified = NOW()  WHERE id_user = ?`;
      values = [user.pseudo, user.id_user];
    } else if (data.bio) {
      sql = `UPDATE users SET bio = ?, date_modified = NOW()  WHERE id_user = ?`;
      values = [user.bio, user.id_user];
    }

    await User.sendQuery(sql, values);

    res.status(200).json({ message: "Profil modifié" });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.editAvatar = async (req, res) => {
  try {
    if (req.body.oldAvatar) {
      fs.unlink(req.body.oldAvatar, (err) => {
        if (err) throw err;
      });
    }
    const user = new User({
      id_user: req.body.userId,
      avatar: req.file.filename,
    });
    const sql = `UPDATE users SET avatar = ? WHERE id_user = ?`;
    await User.sendQuery(sql, [user.avatar, user.id_user]);

    res.status(200).json({ message: "Profil modifié" });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un Problème est survenu!" });
  }
};
