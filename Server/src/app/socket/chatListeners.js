const events = {
  listen: {
    CHAT_MESSAGE: "chat_message",
    JOIN_ROOM: "join_room",
  },
  emit: {
    CHAT_MESSAGE: "chat_message",
  },
};

const chatListeners = (socket) => {
  const eventHandlers = {
    handleRoomJoin: (room) => socket.join(room),
    handleMessageReceive: (payload) =>
      socket.to(payload.to).emit(events.emit.CHAT_MESSAGE, payload),
  };
  socket.on(events.listen.JOIN_ROOM, eventHandlers.handleRoomJoin);
  socket.on(events.listen.CHAT_MESSAGE, eventHandlers.handleMessageReceive);
};

module.exports = chatListeners;
