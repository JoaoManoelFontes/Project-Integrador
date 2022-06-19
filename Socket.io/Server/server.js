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
const clients = {};
io.on("connection", (socket) => {
    console.log("New client connected: " + socket.id);

    socket.on("clientId", () => {
        socket.emit("myId", socket.id);
    });

    socket.on("sendMessage", ({ message, room }) => {
        console.log(message);
        io.to(room).emit("receiveMessage", message);
    });

    socket.on("joinRoom", (roomId) => {
        if (clients[roomId] == undefined) {
            clients[roomId] = 1;
        } else {
            clients[roomId]++;
        }
        socket.join(roomId);
        socket.room = roomId;
        console.log("User joined room: " + roomId);
        socket.emit("roomJoined", clients[roomId]);
    });

    socket.on("disconnect", () => {
        clients[socket.room]--;
        console.log("Client disconnected");
    });
});

server.listen(8888, () => {
    console.log("Server is running on port 8888");
});