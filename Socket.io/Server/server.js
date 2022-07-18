const app = require("express")();
const http = require("http");
const SocketIO = require("socket.io");

const server = http.createServer(app, {});
const io = SocketIO(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    },
});

const clients = {};
let rooms = [];
io.on("connection", (socket) => {
    console.log("New client connected: " + socket.id);
    io.emit("newRoom", rooms);

    socket.on("generateRoom", () => {
        socket.join(socket.id);
        socket.room = socket.id;
        clients[socket.id] = 1;
        socket.emit("roomGenerated", {
            room: socket.id,
            status: "waiting for player 2",
        });
        rooms.push(socket.id);
        console.log("-----Clients:" + clients);
        console.log("-----rooms:" + rooms);
    });

    socket.on("joinRoom", (room) => {
        if (clients[room] == 1) {
            clients[room]++;
            socket.room = room;
            socket.join(room);
            socket.emit("roomJoined", {
                room: room,
                status: "player 2 joined, waiting to start the game",
            });
            io.to(room).emit("status", "player 2 joined, waiting to start the game");
        } else if (clients[room] == undefined) {
            clients[room] = 1;
            socket.room = room;
            socket.join(room);
            socket.emit("roomJoined", {
                room: socket.id,
                status: "waiting for player 2",
            });
        } else {
            socket.emit(
                "joinRoomError",
                "This room has already full! Generate a room to continue"
            );
        }
    });

    socket.on("disconnect", () => {
        rooms = rooms.filter((room) => {
            if (room == socket.id) {
                io.to(room).emit(
                    "roomError",
                    "Host leaves the room! back to the homepage"
                );
            }
            return room != socket.id;
        });
        clients[socket.room]--;
        console.log("Client disconnected");
    });
});

server.listen(8888, () => {
    console.log("Server is running on port 8888");
});