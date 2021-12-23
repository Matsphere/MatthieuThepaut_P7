const express = require("express");
const mysql = require("mysql");
const PublicationsRoutes = require("./routes/publications");
const userRoutes = require("./routes/user");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const clean = require("xss-clean");

const app = express();
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "groupomania",
});
connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(morgan("tiny"));
app.use(helmet());
app.use(clean());
app.use(express.json());
app.use("/api/publications", PublicationsRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
