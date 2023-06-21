require("dotenv").config();
const initializeSocket = require("./src/app/socket/initializeSocket");
const express = require("express");
const connectDB = require("./src/config/dbConfig");
const authRouter = require("./src/app/routes/authRoutes");
const friendRouter = require("./src/app/routes/friendRoutes");

const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 3000;

const routes = {
  AUTH: "/auth",
  USER: "/user",
  FRIEND: "/user/friend",
};

app.use(express.json());

connectDB();

app.use(routes.AUTH, authRouter);
app.use(routes.FRIEND, friendRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An error occurred";
  res.status(statusCode).json({ error: message });
});

initializeSocket(server);

server.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}/`)
);
