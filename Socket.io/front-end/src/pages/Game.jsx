import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../services/client";
import styled from "styled-components";

import Alert from "@mui/material/Alert";

import api from "../services/api";
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import Battle from "../components/Battle";
import Cards from "../components/Cards";
import { Container } from "@mui/system";

const Card_container = styled.div`
  display: flex;
  padding: 1em;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: space-around;
  margin-top: 3%;
`;

const Status_container = styled.div`
  margin-left: 2%;
`;

export default function Game() {
  //? States & Hooks
  const { state } = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [roomError, setRoomError] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [winner, setWinner] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  const [cards, setCards] = useState();

  //?Effects
  useEffect(() => {
    //Getting cards from api
    api
      .get()
      .then(({ data }) => {
        setCards(data.cards);
      })
      .catch((err) => {
        console.log(err.response.body);
      });

    if (state.room != state.socketId) {
      setPlayerId(state.room);
    }

    setStatus(state.status);
  }, []);

  useEffect(() => {
    socket.on("status", (data) => setStatus(data));

    socket.on("winner", (data) => setWinner(data));

    socket.on("playerId", (data) => setPlayerId(data));

    socket.on("roomError", (data) => setRoomError(data));
  }, [socket]);

  //?Handle Functions

  const handleChange = (e) => {
    setPlayerCard(JSON.parse(e.target.value));
  };

  const handleFormSend = () => {
    socket.emit("sendCard", {
      playerCard,
      room: state.room,
      id: state.socketId,
    });
  };

  //? Render
  return (
    <>
      <Header />
      <main>
        <Battle state={state} />
        {winner != null ? (
          navigate("/game-result", {
            state: {
              winner,
              socketId: state.socketId,
              status,
            },
          })
        ) : (
          <p></p>
        )}
        <br />
        {playerId != null ? (
          <Cards state={cards} room={state.room} socketId={state.socketId} />
        ) : (
          <Container maxWidth="md" sx={{ marginBottom: "5%" }}>
            <Alert variant="outlined" severity="info">
              Você poderá escolher sua carta quando a sala estiver cheia!
            </Alert>
          </Container>
        )}
      </main>
      <Footer />
    </>
  );
}
