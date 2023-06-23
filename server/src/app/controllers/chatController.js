const Conversation = require("../models/conversation");
const Message = require("../models/message");
const User = require("../models/user");

const getRecentConversations = async (req, res, next) => {
  try {
    const id = `6494e3d6bb99480a4038f8bb`;
    const user = await User.findById(id, "conversations").populate({
      path: "conversations",
      match: { active: true },
      populate: [
        {
          path: "participants",
          model: "User",
          select: "username profileImage",
        },
        {
          path: "messages",
          model: "Message",
          options: { limit: 1 },
        },
      ],
    });
    res.json({ conversations: user.conversations });
  } catch (error) {
    next(error);
  }
};
const getConversation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const conversation = await Conversation.findById(id).populate([
      {
        path: "participants",
        model: "User",
        select: "username profileImage",
      },
      {
        path: "messages",
        model: "Message",
      },
    ]);
    res.json({ conversation });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecentConversations, getConversation };
