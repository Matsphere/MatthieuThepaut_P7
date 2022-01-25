const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const PublicationsCtrl = require("../controllers/publications");
const CommentsCtrl = require("../controllers/comments");

router.get("/", auth, PublicationsCtrl.getAllPublications);
router.post("/", auth, PublicationsCtrl.createPublication);
router.put("/:id", auth, PublicationsCtrl.modifyPublication);
router.delete("/:id", auth, PublicationsCtrl.deletePublication);
router.post("/:id/like", auth, PublicationsCtrl.feedback);
router.post("/comments", auth, CommentsCtrl.getAllComments);
router.post("/:id/comment", auth, CommentsCtrl.createComment);

module.exports = router;
