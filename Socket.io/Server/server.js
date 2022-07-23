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
let rooms = [];
let players = [];
let players_in_a_room = [];

function winer(playerCards) {
    console.log(playerCards);
    if (playerCards[0] > playerCards[1]) {
        return playerCards[0] + "ganhou!";
    } else if (playerCards[0] < playerCards[1]) {
        return playerCards[1] + "ganhou!";
    } else {
        return "Empate!";
    }
}

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

    socket.on("sendCard", ({ playerCard, room }) => {
        if (players[room] == undefined) {
            players_in_a_room.push(playerCard);
            players[room] = players_in_a_room;
            io.to(room).emit("status", "Player 1 has already choices his card");
        } else if (players[room].length == 1) {
            players_in_a_room.push(playerCard);
            players[room] = players_in_a_room;
            io.to(room).emit("status", "Player 2 has already choices his card");
            console.log(winer(players[room]));
            players_in_a_room = [];
        } else if (players[room].length >= 2) {
            socket.emit("status", "You only can pick a card 1 time ");
        }
        // if (players_in_a_room.length == 0) {
        // } else if (players_in_a_room.length == 1) {
        //     players_in_a_room.push(playerCard);
        //     players[room] = players_in_a_room;
        // } else {
        //     socket.emit("status", "You only can pick a card 1 time ");
        // }
    });

    socket.on("disconnect", () => {
        rooms = rooms.filter((room) => {
            if (room == socket.room) {
                io.to(room).emit(
                    "roomError",
                    "A player leaves the room! back to the homepage"
                );
            }
            return room != socket.room;
        });
        clients[socket.room]--;
        players[socket.room] = undefined;
        console.log("Client disconnected");
    });
});

server.listen(8888, () => {
    console.log("Server is running on port 8888");
});