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

const cards = [{
        name: "BoyCard",
        src: "../static/boyCard.jpeg",
        strong: 79,
        speed: 90,
        agility: 91,
        smartness: 70,
    },
    {
        name: "GirlCard",
        src: "../static/girlCard.jpeg",
        strong: 82,
        speed: 80,
        agility: 91,
        smartness: 90,
    },
];

function winner(playerCards) {
    const card1 = cards[playerCards[0].playerCard.card];
    const card2 = cards[playerCards[1].playerCard.card];
    if (playerCards[0].playerCard.power > playerCards[1].playerCard.power) {
        return {
            winner: playerCards[0].id,
            cardId: playerCards[0].playerCard.card,
            status: playerCards[0].id + " ganhou com a cartinha " + card1.name + "!",
        };
    } else if (
        playerCards[0].playerCard.power < playerCards[1].playerCard.power
    ) {
        return {
            winner: playerCards[1].id,
            cardId: playerCards[1].playerCard.card,
            status: playerCards[1].id + " ganhou com a cartinha " + card2.name + "!",
        };
    } else {
        return "Empate!";
    }
}

io.on("connection", (socket) => {
    console.log("New client connected: " + socket.id);
    socket.emit("newRoom", rooms);
    socket.emit("myId", socket.id);

    socket.on("generateRoom", () => {
        console.log("generate");
        socket.join(socket.id);
        socket.room = socket.id;
        clients[socket.id] = 1;
        socket.emit("roomGenerated", {
            room: socket.id,
            status: "waiting for player 2",
        });
        rooms.push(socket.id);
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
            io.to(room).emit("playerId", socket.id);
        } else if (clients[room] == undefined) {
            clients[room] = 1;
            socket.room = room;
            socket.join(room);
            socket.emit("roomJoined", {
                room: socket.id,
                status: "waiting for player 2",
            });
            rooms.push(socket.id);
        } else {
            socket.emit(
                "joinRoomError",
                "This room has already full! Generate a room to continue"
            );
        }
    });

    socket.on("sendCard", ({ playerCard, room, id }) => {
        if (players[room] == undefined) {
            players_in_a_room.push({ playerCard, id });
            players[room] = players_in_a_room;
            io.to(room).emit("status", socket.id + " has already choices his card");
        } else if (players[room].length == 1) {
            players_in_a_room.push({ playerCard, id });
            players[room] = players_in_a_room;
            io.to(room).emit("status", "Players has already choices his card");
            const result = winner(players[room]);
            io.to(room).emit("status", result.status);
            io.to(room).emit("winner", {
                winner: result.winner,
                cardId: result.cardId,
            });
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