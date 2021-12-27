const connection = require("../db");

const publications = `CREATE TABLE IF NOT EXISTS publications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_id INT NOT NULL,
    date DATE NOT NULL,
    text VARCHAR(255) NOT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    users_liked JSON,
    users_disliked JSON
)`;

connection.query(publications, (err) => {
  if (err) throw err;
});
