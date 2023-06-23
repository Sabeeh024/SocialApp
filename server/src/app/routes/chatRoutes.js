const express = require("express");
const {
  getRecentConversations,
  getConversation,
} = require("../controllers/chatController");
const chatRouter = express.Router();

const routes = {
  GET_RECENT_CHATS: "/get-recent-chats",
  GET_CHAT: "/get-chat/:id",
};

chatRouter.get(routes.GET_RECENT_CHATS, getRecentConversations);
chatRouter.get(routes.GET_CHAT, getConversation);

module.exports = chatRouter;
