const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const CommentsCtrl = require("../controllers/comments");

router.put("/:id", auth, CommentsCtrl.modifyComment);
router.delete("/:id", auth, CommentsCtrl.deleteComment);

module.exports = router;
