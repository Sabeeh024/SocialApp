const User = require("../models/user");
const FriendRequest = require("../models/friendRequest");
const Conversation = require("../models/conversation");

// validation: if already friends don't send request

const generateError = (statusCode, statusText) => {
  const error = new Error(statusText);
  error.statusCode = statusCode;
  throw error;
};

const getFriends = async (req, res, next) => {
  try {
    const id = `64930458408adb2f4273e6aa`;
    const user = await User.findById(id, "friends").populate(
      "friends.user",
      "username profileImage"
    );
    res.json({ friends: user.friends });
  } catch (error) {
    next(error);
  }
};

const sendRequest = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const userIds = [from, to];

    const existingRequest = await FriendRequest.findOne({
      from,
      to,
    });

    if (existingRequest)
      generateError(409, "Friend request has already been sent");

    const friendRequest = new FriendRequest(req.body);
    await friendRequest.save();

    await User.updateMany(
      { _id: { $in: userIds } },
      { $push: { friendRequests: friendRequest } }
    );

    res.status(201).json({ message: "Request has been sent successfully" });
  } catch (error) {
    next(error);
  }
};

const acceptRequest = async (req, res, next) => {
  try {
    const { requestId } = req.body;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) generateError(409, "Friend request doesn'nt exists");

    const conversation = new Conversation({
      participants: [friendRequest.from, friendRequest.to],
    });

    await conversation.save();

    await User.updateOne(
      { _id: friendRequest.from },
      {
        $addToSet: { friends: { user: friendRequest.to, conversation } },
        $push: { conversations: conversation },
        $pull: { friendRequests: requestId },
      }
    );

    await User.updateOne(
      { _id: friendRequest.to },
      {
        $addToSet: { friends: { user: friendRequest.from, conversation } },
        $push: { conversations: conversation },
        $pull: { friendRequests: requestId },
      }
    );

    await friendRequest.deleteOne();

    res.status(201).json({ message: "Friend request has been accepted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendRequest, acceptRequest, getFriends };
