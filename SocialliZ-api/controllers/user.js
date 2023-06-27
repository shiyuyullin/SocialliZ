const User = require("../models/user");

exports.getUser = async (req, res, next) => {
  // get userId
  const userId = req.params.userId;
  const user = await User.findById(userId).catch((err) => {
    console.log("error when retrieving user!");
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
  if (!user) {
    const error = new Error("Could not find user");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: "user fetched", user: user });
};
