require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secretKey = process.env.JWT_SECRET_KEY;

const createError = (statusCode, statusText) => {
  const error = new Error(statusText);
  error.statusCode = statusCode;
  return error;
};

const login = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) throw createError(404, "User not found");

    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) throw createError(409, "User already exists");

    const newUser = new User({ username });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, signup };
