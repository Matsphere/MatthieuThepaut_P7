const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message:
    "Trop de tentative de connexion successive! Réessayez dans 15 minutes! ",
});

router.post("/signup", userCtrl.signup);
router.post("/login", limiter, userCtrl.login);
router.post("/profile/info", auth, userCtrl.editInfo);
router.post("/profile/avatar", auth, multer, userCtrl.editAvatar);

module.exports = router;
