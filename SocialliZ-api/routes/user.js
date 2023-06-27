const express = require("express");
const isAuth = require("../middleware/is-auth");
const { getUser } = require("../controllers/user");
const router = express.Router();

// Getting a user with userId
// /user/:userId
router.get("/:userId", isAuth, getUser);

module.exports = router;
