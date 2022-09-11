const { io } = require("./connect");

const { winner } = require("./winner");

//? data variables
const clients = {};
let rooms = [];
let players = {};

//?Socket events
io.on("connection", (socket) => {
    console.log("New client connected: " + socket.id);
    socket.emit("newRoom", rooms);
    socket.emit("myId", socket.id);

    //?Função batalhar - entrando em uma sala aleatória
    socket.on("battle", () => {
        if (rooms.length == 0) {
            socket.emit(
                "joinRoomError",
                "Não existe nenhuma sala disponível no momento, crie uma para continuar"
            );
        } else {
            rooms.map((room, index) => {
                if (clients[room] == 1) {
                    clients[room]++;
                    socket.join(room);
                    socket.room = room;
                    socket.emit("roomJoined", {
                        room: room,
                        status: "player 2 joined, waiting to start the game",
                    });
                    io.to(room).emit(
                        "status",
                        "player 2 joined, waiting to start the game"
                    );
                    io.to(room).emit("playerId", socket.id);
                    io.to(room).emit(
                        "cardStatus",
                        `ID: ${socket.id.substr(0, 8)}... <br />Jogador encontrado`
                    );
                } else if (clients[room] == 2 && index == rooms.length - 1) {
                    socket.emit(
                        "joinRoomError",
                        "Não existe nenhuma sala disponível no momento, crie uma para continuar"
                    );
                }
            });
        }
    });

    //?Criando uma sala
    socket.on("generateRoom", () => {
        socket.join(socket.id);
        socket.room = socket.id;
        clients[socket.room] = 1;
        socket.emit("roomGenerated", {
            room: socket.room,
            status: "waiting for player 2",
        });
        rooms.push(socket.room);
    });

    //?Entrando numa sala nova
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
            io.to(room).emit(
                "cardStatus",
                `ID: ${socket.id.substr(0, 8)}... <br />Jogador encontrado`
            );
        } else {
            socket.emit(
                "joinRoomError",
                "This room has already full or does not exists! Generate a room to continue"
            );
        }
    });

    //?Escolhendo a carta para batalhar
    socket.on("sendCard", ({ playerCard, room, id }) => {
        if (players[room] == undefined) {
            players[room] = { player1: { playerCard, id }, player2: undefined };
            io.to(room).emit("status", socket.id + " has already choices his card");
            io.to(room).emit("senderId", socket.id);
            console.log(players[room].player1.id);
        } else if (players[room].player1.id == socket.id) {
            socket.emit("status", "You only can pick a card 1 time ");
        } else if (players[room].player2 == undefined) {
            players[room].player2 = { playerCard, id };
            io.to(room).emit("status", "Players has already choices his card");
            (async() => {
                const result = await winner(players[room]);
                io.to(room).emit("status", result.status);
                io.to(room).emit("winner", {
                    winner: result.winner,
                    cardId: result.cardId,
                });
            })();
        }
    });

    //? saindo da conexão com o server
    socket.on("disconnect", () => {
        rooms.splice(rooms.indexOf(socket.room), 1);
        clients[socket.room]--;
        players[socket.room] = undefined;
        console.log("Client disconnected");
    });
});