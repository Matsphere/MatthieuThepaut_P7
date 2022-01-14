const dotenv = require("dotenv");
const connection = require("../db");
dotenv.config();

exports.getAllPublications = async (req, res, next) => {
  try {
    const sql = `SELECT pub.*, users.avatar, users.pseudo, COUNT(*) as comments_number  FROM publications pub 
    LEFT JOIN users
    ON pub.author_id = users.id_user
    LEFT JOIN comments
    ON comments.pub_id = pub.id_publication
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
      pubId: req.params.id,
    };
    const reaction = await connection.query(
      `SELECT users_iked, users_disliked FROM publications WHERE id_publication=?`,
      [data.pubId]
    );

    data.usersLiked = JSON.parse(reaction[0].users_liked);
    data.usersDisliked = JSON.parse(reaction[0].users_disliked);

    if (data.vote == 0 && data.usersLiked.includes(data.userId)) {
      const index = data.usersLiked.findIndex((id) => {
        id == userdata.userId;
      });
      const value = JSON.stringify(data.usersLiked.splice(index, 1));
      const sql = `UPDATE publications SET users_liked = ? WHERE id_publication = ?`;
    }
    if (data.vote == 0 && data.usersDisliked.includes(data.userId)) {
      const index = data.usersDisliked.findIndex((id) => {
        id == userdata.userId;
      });
      const value = JSON.stringify(data.usersDisiked.splice(index, 1));
      const sql = `UPDATE publications SET users_disliked = ? WHERE id_publication = ?`;
    }

    if (data.vote == 1) {
      const value = JSON.stringify(data.usersLiked.push(data.userId));
      const sql = `UPDATE publications SET users_liked = ? WHERE id_publication = ?`;
    }
    if (data.vote == -1) {
      const value = JSON.stringify(data.usersDisiked.push(data.userId));
      const sql = `UPDATE publications SET users_disliked = ? WHERE id_publication = ?`;
    }
    await connection.query(sql, [value, data.pubId], (err, resut) => {
      if (err) {
        throw err;
      }
      return res.status(200).json({ message: "Vote enregistré!" });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
