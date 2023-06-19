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

// const activeUsers = {};
const activeUsers = new Map();

const handleConnect = (socket) => {
  const name = socket.handshake.query.name;
  activeUsers.set(name, socket.id);
  // activeUsers[name] = socket.id;
  socket.broadcast.emit(events.emit.STATUS_ONLINE, {
    id: socket.id,
  });
  baseListeners(socket);
  chatListeners(socket, activeUsers);
};

const initializeSocket = (server) => {
  const io = configureSocket(server);
  io.on(events.listen.CONNECTION, handleConnect);
};

module.exports = initializeSocket;
