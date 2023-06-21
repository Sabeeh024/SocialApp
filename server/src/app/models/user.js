const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  friends: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    },
  ],
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FriendRequest",
    },
  ],
  conversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
