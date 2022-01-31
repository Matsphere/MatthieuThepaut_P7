const connection = require("../db");

const Publication = function (publication) {
  this.id_publication = publication.id_publication;
  this.author_id = publication.author_id;
  this.text = publication.text;
  this.users_liked = publication.users_liked || [];
  this.users_disliked = publication.users_disliked || [];
};

Publication.getAllPublications = (callback) => {
  connection.query(
    `SELECT pub.*, users.avatar, users.pseudo, users.id_user, (SELECT COUNT(*) FROM comments) AS comments_number  FROM publications pub 
  LEFT JOIN users
  ON pub.author_id = users.id_user
  LEFT JOIN comments
  ON comments.pub_id = pub.id_publication
  GROUP BY pub.id_publication
  ORDER BY pub.date_created DESC`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        results.forEach((pub) => {
          pub.avatar = process.env.URL + process.env.DIR + pub.avatar;
          pub.users_liked = JSON.parse(pub.users_liked);
          pub.users_disliked = JSON.parse(pub.users_disliked);
        });

        callback(null, results);
      }
    }
  );
};

Publication.createPublication = (publication, callback) => {
  connection.query(
    `INSERT INTO publications (author_id, text, users_liked, users_disliked, date_created, date_modified) VALUES (?, ?, ?, ?, NOW(),NOW())`,
    [
      publication.author_id,
      publication.text,
      JSON.stringify(publication.users_liked),
      JSON.stringify(publication.users_disliked),
    ],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        publication.id_publication = result.insertId;

        callback(null, publication);
      }
    }
  );
};

Publication.modifyPublication = (publication, callback) => {
  connection.query(
    `UPDATE publications SET text = ?, date_modified = NOW() WHERE id_publication = ?`,
    [publication.text, publication.id_publication],
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    }
  );
};

Publication.deletePublication = (id, callback) => {
  connection.query(
    `DELETE FROM publications  WHERE id_publication = ?`,
    [id],
    (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    }
  );
};

Publication.feedback = (data, callback) => {
  if (data.vote == 0 && data.users_liked.includes(data.id_user)) {
    const index = data.users_liked.findIndex((id) => {
      id == data.id_user;
    });
    data.users_liked.splice(index, 1);

    connection.query(
      `UPDATE publications SET users_liked = ? WHERE id_publication = ?`,
      [JSON.stringify(data.users_liked), data.id_publication],
      (err) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      }
    );
  }

  if (data.vote == 0 && data.users_disliked.includes(data.id_user)) {
    const index = data.users_disliked.findIndex((id) => {
      id == data.id_user;
    });
    data.users_disliked.splice(index, 1);

    connection.query(
      `UPDATE publications SET users_disliked = ? WHERE id_publication = ?`,
      [JSON.stringify(data.users_disliked), data.id_publication],
      (err) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      }
    );
  }

  if (data.vote == 1) {
    data.users_liked.push(data.id_user);

    connection.query(
      `UPDATE publications SET users_liked = ? WHERE id_publication = ?`,
      [JSON.stringify(data.users_liked), data.id_publication],
      (err) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      }
    );
  }

  if (data.vote == -1) {
    data.users_disliked.push(data.id_user);

    connection.query(
      `UPDATE publications SET users_disliked = ? WHERE id_publication = ?`,
      [JSON.stringify(data.users_disliked), data.id_publication],
      (err) => {
        if (err) {
          callback(err,null);
        } else {
          callback(null,data);
        }
      }
    );
  }
};

module.exports = Publication;
