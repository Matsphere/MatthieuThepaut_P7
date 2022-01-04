const jwt = require("jsonwebtoken");
const connection = require("../db");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    console.log(userId);
    await connection.query(
      `SELECT FROM users WHERE id = ?`,
      [userId],
      (err, result) => {
        if (err) throw err;
        else if (!result)
          res.status(401).json({ message: "Utilisateur non authorisé!" });
        else next();
      }
    );
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
