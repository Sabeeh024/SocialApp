const { login, signup } = require("../controllers/authController");
const express = require("express");
const authRouter = express.Router();

const routes = {
  LOGIN: "/login",
  SIGNUP: "/signup",
};

authRouter.post(routes.LOGIN, login);
authRouter.post(routes.SIGNUP, signup);

module.exports = authRouter;
