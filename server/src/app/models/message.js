const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //   receiver: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     refPath: 'receiverModel'
  //   },
  //   receiverModel: {
  //     type: String,
  //     enum: ['User', 'Group']
  //   },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
