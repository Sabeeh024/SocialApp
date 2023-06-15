require("dotenv").config();
const initializeSocket = require("./src/app/socket/initializeSocket");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 3000;

initializeSocket(server);

server.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}/`)
);
