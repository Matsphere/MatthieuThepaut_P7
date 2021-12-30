const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const PublicationsCtrl = require("../controllers/publications");
const CommentsCtrl = require("../controllers/comments");

router.get("/", auth, PublicationsCtrl.getAllPublications);
router.get("/:id", auth, PublicationsCtrl.getOnePublication);
router.post("/", auth, multer, PublicationsCtrl.createPublication);
router.put("/:id", auth, multer, PublicationsCtrl.modifyPublication);
router.delete("/:id", auth, PublicationsCtrl.deletePublication);
router.post("/:id/like", auth, PublicationsCtrl.feedback);
router.get("/:id/comments", auth, CommentsCtrl.getAllComments);
router.post("/:id/comment", auth, CommentsCtrl.createComment);

module.exports = router;
