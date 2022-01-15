const connection = require("../db");

const Publication = function (publication) {
  this.id_publication = publication.id_publication;
  this.author_id = publication.author_id;
  this.text = publication.text;
  this.users_liked = publication.users_liked || [];
  this.users_disliked = publication.users_disliked || [];
};

Publication.sendQuery = (sql, values) => {
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return result;
  });
};

module.exports = Publication;
