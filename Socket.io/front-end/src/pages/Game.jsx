import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import socket from "../services/client";
import styled from "styled-components";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

import api from "../services/api";
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import Battle from "../components/Battle";
import Cards from "../components/Cards";
import { Container } from "@mui/system";
import { Button } from "@mui/material";

export default function Game() {
  //? States & Hooks
  const { state } = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [winner, setWinner] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [roomError, setRoomError] = useState(null);

  const [cards, setCards] = useState();

  const [toogle, setToogle] = useState(false);
  const [timer, setTimer] = useState(6);

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

  // ?Timer effect
  useEffect(() => {
    if (toogle) {
      if (timer > 0) {
        setTimeout(() => {
          setTimer(timer - 1);
        }, 1000);
      } else {
        navigate("/game-result", {
          state: {
            winner,
            socketId: state.socketId,
            status,
          },
        });
      }
    }
  }, [timer, toogle]);

  useEffect(() => {
    socket.on("status", (data) => setStatus(data));

    socket.on("winner", (data) => {
      setWinner(data);
      setToogle(true);
    });

    socket.on("playerId", (data) => setPlayerId(data));

    socket.on("leavesRoomError", (data) => setRoomError(data));
  }, [socket]);

  //? Render
  return (
    <>
      <Header />
      <main>
        <Battle state={state} />
        <br />
        {/* Timer render */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "column",
            justifyContent: "center ",
          }}
        >
          <Typography
            variant="body2"
            color="black"
            align="center"
            sx={{ display: toogle ? "block" : "none" }}
          >
            O resultado será mostrado em ... <br /> <span>00:0{timer}</span>
          </Typography>
        </Box>
        {roomError && (
          <Container maxWidth="md" sx={{ marginBottom: "5%" }}>
            <Alert variant="outlined" severity="info">
              {roomError}
            </Alert>
            <Link to="/">
              <Button>Voltar</Button>
            </Link>
          </Container>
        )}
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
