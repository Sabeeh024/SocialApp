const express = require("express");
const {
  sendRequest,
  acceptRequest,
  getFriends,
} = require("../controllers//friendController");
const friendRouter = express.Router();

const routes = {
  request: {
    SEND: "/request-send",
    ACCEPT: "/request-accept",
    REJECT: "/request-reject",
  },
  friends: {
    GET_ALL_FRIENDS: "/all",
  },
};

friendRouter.post(routes.request.SEND, sendRequest);
friendRouter.post(routes.request.ACCEPT, acceptRequest);
friendRouter.get(routes.friends.GET_ALL_FRIENDS, getFriends);

module.exports = friendRouter;
