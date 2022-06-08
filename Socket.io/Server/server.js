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
        socket.join(roomId);
        console.log("User joined room: " + roomId);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(8888, () => {
    console.log("Server is running on port 8888");
});