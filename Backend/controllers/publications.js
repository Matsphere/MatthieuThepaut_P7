const dotenv = require("dotenv");
const connection = require("../db");
dotenv.config();

exports.getAllPublications = async (req, res, next) => {
  try {
    const sql = `SELECT pub.*, users.avatar, users.pseudo, (SELECT COUNT(*) FROM reactions WHERE vote = 1) AS likes, (SELECT COUNT(*) FROM reactions WHERE vote = 0) AS dislikes, JSON_ARRAYAGG((SELECT voter_id FROM reactions WHERE vote = 1)) AS users_liked, JSON_ARRAYAGG((SELECT voter_id FROM reactions WHERE vote = 0)) AS users_disliked  FROM publications pub 
    LEFT JOIN users
    ON pub.author_id = users.id_user
    LEFT JOIN reactions
    ON reactions.pub_id = pub.id_publication
    GROUP BY pub.id_publication
    ORDER BY pub.date_created DESC`;
    await connection.query(sql, async (err, result) => {
      if (err) throw err;

      console.log(result);
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOnePublication = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM publications WHERE id_publication = ?`;
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
    const sql = `INSERT INTO publications (author_id, text, date_created, date_modified) VALUES (?, ?, NOW(), NOW())`;
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
    const sql = `UPDATE publications SET text = ?, date_modified = NOW() WHERE id_publication = ?`;
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
    const sql = `DELETE FROM publications  WHERE id_publication = ?`;
    await connection.query(sql, [req.params.id], (err) => {
      if (err) throw err;

      res.status(200).json({ message: "Publication supprimée" });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.feedback = async (req, res, next) => {
  try {
    const data = {
      userId: req.body.userId,
      vote: req.body.vote,
    };
    if (data.vote == 0) {
      const sql = `DELETE FROM reactions WHERE pub_id=? AND voter_id = ?`;
      await connection.query(
        sql,
        [req.params.id, data.userId],
        async (err, result) => {
          if (err) throw err;
          return res.status(201).json({ message: "Vote enregistré!" });
        }
      );
    } else {


      const sql1 = `SELECT * from reactions WHERE pub_id=? AND voter_id = ?`;
      const result = await connection.query(sql1, [req.params.id, data.userId]);
      if (result[0]) {
         console.log(result[0]);
         const sql = `UPDATE reactions SET vote = ?, date_modified = NOW() WHERE pub_id = ? AND voter_id = ?`;
         await connection.query(sql, [data.vote == -1 ? 0 : 1,  req.params.id, data.userId], (err) => {
                if (err) throw err;
         });
         return res.status(201).json({ message: "Vote enregistré!" });
      } else {
         const sql = `INSERT INTO reactions (voter_id, pub_id, vote, date_created, date_modified) VALUES (?, ?, ?, NOW(), NOW())`;
         await connection.query(sql, [data.userId, req.params.id, data.vote == -1 ? 0 : 1], (err) => {
                if (err) throw err;
          });
         return res.status(201).json({ message: "Vote enregistré!" });
        }
    }
    
    
  } catch (err) {
    res.status(400).json({ err });
  }
};
