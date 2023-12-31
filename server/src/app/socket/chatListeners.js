const { activeUsers, activeConversations } = require("./socketData");

const events = {
  listen: {
    CHAT_MESSAGE: "chat_message",
    JOIN_ROOM: "join_room",
    IS_TYPING: "is_typing",
    STOPPED_TYPING: "stopped_typing",
  },
  emit: {
    CHAT_MESSAGE: "chat_message",
    IS_TYPING: "is_typing",
    STOPPED_TYPING: "stopped_typing",
  },
};

const chatListeners = (socket) => {
  const eventHandlers = {
    handleRoomJoin: (room) => socket.join(room),
    handleMessageReceive: async (payload) => {
      const { from, to, convoId, content } = payload;
      socket
        .to(activeUsers.getKeyByValue(to))
        .emit(events.emit.CHAT_MESSAGE, payload);
      if (activeConversations.has(convoId))
        activeConversations.get(convoId).push({
          from,
          to,
          content,
        });
      else
        activeConversations.set(convoId, [
          {
            from,
            to,
            content,
          },
        ]);
    },
    // handleIsTyping: (payload) =>
    //   socket
    //     .to(activeUsers.get(payload?.receiver_name))
    //     .emit(events.emit.IS_TYPING, payload),
    // handleStoppedTyping: (payload) =>
    //   socket
    //     .to(activeUsers.get(payload?.receiver_name))
    //     .emit(events.emit.IS_TYPING, payload),
  };
  socket.on(events.listen.JOIN_ROOM, eventHandlers.handleRoomJoin);
  socket.on(events.listen.CHAT_MESSAGE, eventHandlers.handleMessageReceive);
  // socket.on(events.listen.IS_TYPING, eventHandlers.handleIsTyping);
  // socket.on(events.listen.STOPPED_TYPING, eventHandlers.handleStoppedTyping);
};

module.exports = chatListeners;
