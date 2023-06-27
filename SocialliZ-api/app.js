const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const post = require("./models/post");
const { generateRandomPosts } = require("./db-data-generator/randomPosts");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();
const MONGODB_URI = process.env.MONGODB_CONNECTION;

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));

app.use("/user", userRoutes);
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ message: message, data: data });
});

// generating some test data
// const posts = generateRandomPosts(5);
// console.log(posts);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    const server = app.listen(8080);
    // Saving test data into database
    // post.bulkSave(posts);
  })
  .catch((err) => console.log(err));

console.log("started");
