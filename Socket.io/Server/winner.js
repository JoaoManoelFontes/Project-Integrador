//?axios
const axios = require("axios");

const api = axios.create({
    baseURL: "http://localhost:3333/api/get",
});

//?Winner function
async function winner(players) {
    const { data } = await api.get();
    const card1 = data.cards[players.player1.playerCard.card];
    const card2 = data.cards[players.player2.playerCard.card];
    if (players.player1.playerCard.power > players.player2.playerCard.power) {
        return {
            winner: players.player1.id,
            status: players.player1.id + " ganhou com a cartinha " + card1.name + "!",
        };
    } else if (
        players.player1.playerCard.power < players.player2.playerCard.power
    ) {
        return {
            winner: players.player2.id,
            status: players.player2.id + " ganhou com a cartinha " + card2.name + "!",
        };
    } else {
        return {
            winner: null,
            status: "Os atributos das cartinhas escolhidas foram iguais!",
        };
    }
}

module.exports = { winner };