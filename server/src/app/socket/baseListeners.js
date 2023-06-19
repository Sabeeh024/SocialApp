const events = {
  listen: {
    STATUS_ONLINE: "status_online",
    STATUS_OFFLINE: "status_offline",
    DISCONNECT: "disconnect",
    ERROR: "error",
  },
  emit: {
    STATUS_OFFLINE: "status_offline",
    ERROR: "error",
  },
};

const baseListeners = (socket) => {
  const eventHandlers = {
    handleStatusOffline: (payload) => console.log(`${payload?.id} is offline!`),
    handleStatusOnline: (payload) => console.log(`${payload?.id} is Online!`),
    handleError: (error) => socket.emit(events.emit.ERROR, error),
    handleDisconnect: (reason) => {
      socket.broadcast.emit(events.emit.STATUS_OFFLINE, {
        id: socket.id,
      });
      console.log(`${socket.id} disconnected with reason: ${reason}`);
    },
  };
  socket.on(events.listen.STATUS_OFFLINE, eventHandlers.handleStatusOffline);
  socket.on(events.listen.STATUS_ONLINE, eventHandlers.handleStatusOnline);
  socket.on(events.listen.ERROR, eventHandlers.handleError);
  socket.on(events.listen.DISCONNECT, eventHandlers.handleDisconnect);
};

module.exports = baseListeners;
