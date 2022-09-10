import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import parse from "html-react-parser";

import { useEffect, useState } from "react";

import socket from "../services/client";

export default function Battle({ state }) {
  let { socketId, room } = state;
  let prevStatus = state.status;
  //?States
  const [status, setStatus] = useState(prevStatus);
  const [shadowColor1, setShadowColor1] = useState("#786ff5");
  const [textCard1, setTextCard1] = useState(
    `ID: ${socketId.substr(0, 8)}... <br /> Escolha sua carta`
  );
  const [shadowColor2, setShadowColor2] = useState("#786ff5");
  const [textCard2, setTextCard2] = useState("");
  //? Effects
  useEffect(() => {
    if (socketId != room) {
      setTextCard2(`ID: ${room.substr(0, 8)}... <br /> Jogador Encontrado`);
    } else {
      setTextCard2("Jogador ainda <br/> não encontrado");
    }
  }, []);

  useEffect(() => {
    socket.on("senderId", (data) => {
      if (data == socketId) {
        setShadowColor1("#5cf0b7");
        setTextCard1(`ID: ${data.substr(0, 8)}... <br /> Carta escolhida!`);
      } else {
        setShadowColor2("#5cf0b7");
        setTextCard2(`ID: ${data.substr(0, 8)}... <br /> Carta escolhida!`);
      }
    });

    socket.on("cardStatus", (data) => setTextCard2(data));

    socket.on("status", (data) => setStatus(data));
  }, [socket]);
  return (
    <Container maxWidth="md" sx={{ marginTop: "5%" }}>
      <Box sx={{ marginBottom: "5%" }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          PARTIDA
        </Typography>
        <Typography variant="body2" align="center" color="dark" gutterBottom>
          ID = {room}
        </Typography>
      </Box>
      <Box
        sx={{
          borderRadius: 2,
          boxShadow: " 0 0 0.5em",
          marginBottom: "5%",
          backgroundImage: "linear-gradient(#26294e81, #2e2c2c);",
        }}
        bgcolor="#2e2d2d"
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            padding: "5% 10% 0 10%",
            justifyContent: "space-between",
          }}
        >
          <Card
            sx={{
              minHeight: 200,
              minWidth: 170,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#7e7e81",
              borderRadius: "15%",
              boxShadow: `3px 5px 2px ${shadowColor1}`,
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 15 }}
                color="text.secondary"
                gutterBottom
              >
                Player 1
              </Typography>
              <Typography variant="body2">{parse(textCard1)}</Typography>
            </CardContent>
          </Card>
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="primary"
            sx={{ fontWeight: "bold", alignSelf: "center" }}
          >
            VS
          </Typography>
          <Card
            sx={{
              minHeight: 200,
              minWidth: 170,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#7e7e81",
              borderRadius: "15%",
              boxShadow: ` 3px 5px 2px ${shadowColor2}`,
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 15 }}
                color="text.secondary"
                gutterBottom
              >
                Player 2
              </Typography>
              <Typography variant="body2">{parse(textCard2)}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Typography
            variant="h5"
            align="center"
            color="white"
            sx={{
              margin: "5%",
              padding: "5%",
              fontWeight: "bold",
              borderTop: "solid",
            }}
          >
            {status}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
