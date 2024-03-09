// authMiddleware.js

const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const authenticateMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, "taskmanagementsecret");

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = authenticateMiddleware;
