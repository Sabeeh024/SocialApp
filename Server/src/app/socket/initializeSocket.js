const configureSocket = require("../../config/socketConfig");
const baseListeners = require("./baseListeners");
const chatListeners = require("./chatListeners");

const events = {
  listen: {
    CONNECTION: "connection",
  },
  emit: {
    STATUS_ONLINE: "status_online",
  },
};

const handleConnect = (socket) => {
  console.log(`${socket.id} connected`);
  socket.broadcast.emit(events.emit.STATUS_ONLINE, {
    id: socket.id,
  });
  baseListeners(socket);
  chatListeners(socket);
};

const initializeSocket = (server) => {
  const io = configureSocket(server);
  io.on(events.listen.CONNECTION, handleConnect);
};

module.exports = initializeSocket;
