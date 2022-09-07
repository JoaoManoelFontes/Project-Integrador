import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../services/client";
import styled from "styled-components";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import api from "../services/api";

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

    setStatus(state.status);
    if (state.room != state.socketId) {
      setPlayerId(state.room);
    }
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
    <div>
      <h1>Game</h1>
      <div>
        <p>
          {state.socketId} (you) - vs -
          {playerId == null ? " waiting for player" : " " + playerId}
        </p>
      </div>
      <Card_container>
        {cards &&
          cards.map((card, index) => {
            return (
              <div key={index}>
                <Card
                  style={{ marginTop: "5%", backgroundColor: "#ccdff2" }}
                  sx={{ maxWidth: 200 }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={card.src}
                    alt={card.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.name}
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value={`{"card": ${index}, "power":${card.strong}}`}
                          control={<Radio />}
                          label={`Strong :${card.strong}`}
                          onChange={handleChange}
                        />
                        <FormControlLabel
                          value={`{"card": ${index}, "power":${card.speed}}`}
                          control={<Radio />}
                          label={`Speed :${card.speed}`}
                          onChange={handleChange}
                        />
                        <FormControlLabel
                          value={`{"card": ${index}, "power":${card.agility}}`}
                          control={<Radio />}
                          label={`Agility :${card.agility}`}
                          onChange={handleChange}
                        />
                        <FormControlLabel
                          value={`{"card": ${index}, "power":${card.smartness}}`}
                          control={<Radio />}
                          label={`Smartness :${card.smartness}`}
                          onChange={handleChange}
                        />
                      </RadioGroup>
                    </FormControl>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        <Status_container>
          <h2>Status:</h2>
          {status && <p>{status}</p>}
          {roomError && (
            <div>
              <p>{roomError}</p>
              <a href="/">
                <button>Back</button>
              </a>
            </div>
          )}
        </Status_container>
      </Card_container>
      {playerCard && <button onClick={handleFormSend}>Click</button>}
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
    </div>
  );
}
