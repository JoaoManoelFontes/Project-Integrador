const app = require("express")();
const http = require("http");
const SocketIO = require("socket.io");
const server = http.createServer(app, {});
const io = SocketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

server.listen(8888, () => {
    console.log("Server is running on port 8888");
});

module.exports = { io };