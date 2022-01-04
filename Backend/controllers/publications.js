const dotenv = require("dotenv");
const connection = require("../db");
dotenv.config();

exports.getAllPublications = async (req, res, next) => {
  try {
    const sql = `SELECT pub.id, pub.author_id, pub.date, pub.text, users.avatar, users.pseudo  FROM publications pub 
    JOIN users
    ON pub.author_id = users.id`;
    await connection.query(sql, async (err, result) => {
      try {
        if (err) throw err;

        const sql = `SELECT * FROM reactions`;
        await connection.query(sql, (err, res) => {
          if (err) throw err;
          result.forEach((pub) => {
            pub.likes = [];
            pub.dislikes = [];
            res.forEach((reaction) => {
              console.log(reaction);
              if (pub.id == reaction.pub_id && reaction.vote == 1) {
                pub.likes.push(reaction);
              } else if (pub.id == reaction.pub_id && reaction.vote == -1) {
                pub.dislikes.push(reaction);
                console.log(pub);
              }
            });
          });
        });
        console.log(result);
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json({ err });
      }
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
    const sql = `INSERT INTO publications (author_id, text, date) VALUES (?, ?, CURDATE())`;
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
      const sql = `SELECT * from reactions WHERE pub_id=? AND voter_id = ?`;
      await connection.query(
        sql,
        [req.params.id, data.userId],
        async (err, result) => {
          if (err) throw err;
          if (result[0]) {
            console.log(result[0]);
            const sql = `UPDATE reactions SET vote = ? WHERE pub_id = ? AND voter_id = ?`;
            await connection.query(
              sql,
              [data.vote, req.params.id, data.userId],
              (err) => {
                if (err) throw err;
              }
            );
            return res.status(201).json({ message: "Vote enregistré!" });
          } else {
            const sql = `INSERT INTO reactions (voter_id, pub_id, vote) VALUES (?, ?, ?)`;
            await connection.query(
              sql,
              [data.userId, req.params.id, data.vote],
              (err) => {
                if (err) throw err;
              }
            );
            return res.status(201).json({ message: "Vote enregistré!" });
          }
        }
      );
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};
