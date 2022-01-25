const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("password-validator");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const User = require("../models/user");
const connection = require("../db");

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
    User.signup(user, hash, (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      const token = jwt.sign({ userId: user.id_user }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      });

      res.cookie("token", token);
      return res.status(200).json(user);
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
exports.login = async (req, res, next) => {
  try {
    User.login(req.body.email, async (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!data) {
        return res
          .status(404)
          .json({ message: "Aucun compte associé à cette adresse e-mail!" });
      }

      const valid = await bcrypt.compare(req.body.password, data.password);
      if (!valid) {
        return res.status(401).json({ message: "Mot de passe incorrect !" });
      }

      const user = new User(data);

      const token = jwt.sign({ userId: user.id_user }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      });

      res.cookie("token", token);
      return res.status(200).json(user);
    });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.body.params;
    User.getUser(id, (err, user) => {
      if (err) {
       return res.status(500).json(err);
      }
      if (!user) {
        return res.status(404).json({ message: "Un problème est survenu!" });
      }
        return res.status(200).json(user);
    });
  } catch (err) {
    res.status(400).json({ message: "Un problème est survenu!" });
  }
};

exports.editInfo = async (req, res, next) => {
  try {
    const user = new User({
      pseudo: req.body.pseudo,
      bio: req.body.bio,
      id_user: req.params.id,
    });

    User.editInfo(user, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
        return res.status(200).json({ message: "Profil modifié" });
    });
  } catch (err) {
    res.status(400).json({ error: err, message: "Un problème est survenu!" });
  }
};

exports.editAvatar = async (req, res) => {
  try {
    const user = new User({
      id_user: req.params.id,
      avatar: req.file.filename,
      avatar_edited: req.body.avatar_edited,
    });

    await User.editAvatar(user, (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({ message: "Profil modifié" });
    });

    if (user.avatar_edited == 1) {
      fs.unlink(req.body.oldAvatar, (err) => {
        if (err) throw err;
      });
    }
  } catch (err) {
    res.status(400).json({ error: err, message: "Un Problème est survenu!" });
  }
};
