const dotenv = require("dotenv");
dotenv.config();
const Publication = require("../models/publication");

exports.getAllPublications = async (req, res, next) => {
  try {
    const sql = `SELECT pub.*, users.avatar, users.pseudo, users.id_user, (SELECT COUNT(*) FROM comments) AS comments_number  FROM publications pub 
    LEFT JOIN users
    ON pub.author_id = users.id_user
    LEFT JOIN comments
    ON comments.pub_id = pub.id_publication
    GROUP BY pub.id_publication
    ORDER BY pub.date_created DESC`;
    const results = await Publication.sendQuery(sql);
    results.forEach(
      (pub) => (pub.avatar = process.env.URL + process.env.DIR + pub.avatar)
    );

    console.log(results);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOnePublication = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM publications WHERE id_publication = ?`;
    const result = await Publication.sendQuery(sql, [req.params.id]);
    result[0].avatar = process.env.URL + process.env.DIR + result[0].avatar;
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.createPublication = async (req, res, next) => {
  try {
    const sql = `INSERT INTO publications (author_id, text, users_liked, users_disliked, date_created, date_modified) VALUES (?, ?, ?, ?, NOW(), NOW())`;
    const publication = new Publication({
      author_id: req.body.author_id,
      text: req.body.text,
    });
    const result = await Publication.sendQuery(sql, [
      publication.author_id,
      publication.text,
      publication.users_liked,
      publication.users_disliked,
    ]);
    res.status(200).json({ id_publication: result.insertId, ...publication });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.modifyPublication = async (req, res, next) => {
  try {
    const sql = `UPDATE publications SET text = ?, date_modified = NOW() WHERE id_publication = ?`;
    const publication = new Publication({
      text: req.body.text,
      id_publication: req.params.id,
    });
    const result = await Publication.SendQuery(sql, [
      publication.text,
      publication.id_publication,
    ]);

    res.status(200).json({ message: "Publication modifiée" });
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
      `SELECT users_liked, users_disliked FROM publications WHERE id_publication=?`,
      [data.pubId]
    );

    data.usersLiked = JSON.parse(reaction[0].users_liked);
    data.usersDisliked = JSON.parse(reaction[0].users_disliked);
    let value = "";
    let sql = "";
    if (data.vote == 0 && data.usersLiked.includes(data.userId)) {
      const index = data.usersLiked.findIndex((id) => {
        id == data.userId;
      });
      value = JSON.stringify(data.usersLiked.splice(index, 1));
      sql = `UPDATE publications SET users_liked = ? WHERE id_publication = ?`;
    }
    if (data.vote == 0 && data.usersDisliked.includes(data.userId)) {
      const index = data.usersDisliked.findIndex((id) => {
        id == data.userId;
      });
      value = JSON.stringify(data.usersDisiked.splice(index, 1));
      sql = `UPDATE publications SET users_disliked = ? WHERE id_publication = ?`;
    }

    if (data.vote == 1) {
      value = JSON.stringify(data.usersLiked.push(data.userId));
      sql = `UPDATE publications SET users_liked = ? WHERE id_publication = ?`;
    }
    if (data.vote == -1) {
      value = JSON.stringify(data.usersDisiked.push(data.userId));
      sql = `UPDATE publications SET users_disliked = ? WHERE id_publication = ?`;
    }
    const result = await Publication.sendQuery(sql, [value, data.pubId]);
    return res.status(200).json({ message: "Vote enregistré!" });
  } catch (err) {
    res.status(400).json({ err });
  }
};
