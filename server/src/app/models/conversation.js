const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  active: {
    type: Boolean,
    default: false,
  },
});

conversationSchema.pre("save", function (next) {
  if (this.messages.length > 0) {
    this.active = true;
  } else {
    this.active = false;
  }
  next();
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
