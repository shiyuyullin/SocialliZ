const express = require("express");
const { body } = require("express-validator");
const feedController = require("../controllers/feed");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

// get all posts
router.get("/posts", isAuth, feedController.getPosts);
// view a post
router.get("/post/:postId", isAuth, feedController.getPost);
// create a new post
router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);
// update a post
router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updataPost
);
// delete a post
router.delete("/post/:postId", isAuth, feedController.deletePost);
module.exports = router;
