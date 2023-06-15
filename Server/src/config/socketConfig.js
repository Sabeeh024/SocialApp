const socketIO = require("socket.io");

const config = {
  // cors: {
  //   origin: 'http://example.com', // Set the allowed origin(s) for CORS
  //   methods: ['GET', 'POST'], // Set the allowed HTTP methods
  //   allowedHeaders: ['Authorization'], // Set the allowed headers
  //   credentials: true // Enable CORS credentials
  // },
  // transports: ['websocket'], // Limit transports to WebSocket only
  // pingTimeout: 5000, // Set the ping timeout to 5 seconds
  // pingInterval: 2000 // Set the ping interval to 2 seconds
};

const configureSocket = (server) => socketIO(server, config);

module.exports = configureSocket;
