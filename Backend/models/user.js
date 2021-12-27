const connection = require('../db');

const users = `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
)`;

connection.query(users, (err) => {
    if (err) throw err;
});