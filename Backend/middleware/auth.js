const jwt = require("jsonwebtoken");
const connection = require("../db");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    await connection.query(
      `SELECT * FROM users WHERE id_user = ?`,
      [userId],
      (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else if (!result[0])
          res.status(401).json({ message: "Utilisateur non authorisé!" });
        else next();
      }
    );
  } catch (err) {
    res.status(401).json({ err });
  }
};
