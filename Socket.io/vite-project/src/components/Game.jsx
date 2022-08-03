import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../client";
import styled from "styled-components";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import GirlCardImg from "../static/girlCard.jpeg";
import BoyCardImg from "../static/boyCard.jpeg";

const Card_container = styled.div`
  display: flex;
  padding: 1em;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: space-around;
  margin-top: 10%;
`;
const test = "manu";

export default function Game() {
  //? States & Hooks
  const { state } = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [roomError, setRoomError] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [winner, setWinner] = useState(null);

  const [cards, setCards] = useState([
    {
      name: "BoyCard",
      src: BoyCardImg,
      strong: 79,
      speed: 90,
      agility: 91,
      smartness: 70,
    },
    {
      name: "GirlCard",
      src: GirlCardImg,
      strong: 82,
      speed: 80,
      agility: 91,
      smartness: 90,
    },
  ]);

  //?Effects
  useEffect(() => {
    setStatus(state.status);
  }, []);

  useEffect(() => {
    socket.on("status", (data) => setStatus(data));

    socket.on("winner", (data) => setWinner(data));

    socket.on("roomError", (data) => setRoomError(data));
  }, [socket]);

  //?Handle Functions
  const handleChange = (e) => {
    setPlayerCard(JSON.parse(e.target.value));
  };

  const handleFormSend = () => {
    socket.emit("sendCard", { playerCard, room: state.room });
  };

  //? Render
  return (
    <div>
      <h1>Game</h1>
      <Card_container>
        {cards.map((card, index) => {
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
      </Card_container>
      {playerCard && <button onClick={handleFormSend}>Click</button>}
      {status && <p>{status}</p>}
      {roomError && (
        <div>
          <p>{roomError}</p>
          <a href="/">
            <button>Back</button>
          </a>
        </div>
      )}
      {winner != null ? (
        navigate("/game-result", {
          state: {
            winner,
          },
        })
      ) : (
        <p></p>
      )}
    </div>
  );
}
