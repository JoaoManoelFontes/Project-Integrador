// ? React hooks imports
import { useEffect, useState } from "react";

// ? material imports
import { Card, CardContent, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

// ? socket client import
import socket from "../services/client";

// ? Service import - parse string to html
import parse from "html-react-parser";

export default function Battle({ state }) {
  //?Props
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
    // ? Descobrir o texto da cartinha 2

    if (socketId != room) {
      // Se for o jogador que entrou em uma sala já criada
      setTextCard2(`ID: ${room.substr(0, 8)}... <br /> Jogador Encontrado`);
    } else {
      // Se for o jogador que está esperando alguém entrar na sala dele
      setTextCard2("Jogador ainda <br/> não encontrado");
    }
  }, []);

  useEffect(() => {
    // ? Socket actions

    socket.on("senderId", (data) => {
      //? Ao escolher a cartinha

      if (data == socketId) {
        // se foi o próprio jogador que escolheu
        setShadowColor1("#5cf0b7");
        setTextCard1(`ID: ${data.substr(0, 8)}... <br /> Carta escolhida!`);
      } else {
        // Se foi o adversário que escolheu
        setShadowColor2("#5cf0b7");
        setTextCard2(`ID: ${data.substr(0, 8)}... <br /> Carta escolhida!`);
      }
    });

    socket.on("cardStatus", (data) => setTextCard2(data));

    socket.on("status", (data) => setStatus(data));
  }, [socket]);

  //?Render
  return (
    <Container maxWidth="md" sx={{ marginTop: "5%" }}>
      {/* Battle component header */}
      <Box sx={{ marginBottom: "5%" }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          SALA
        </Typography>
        <Typography variant="body2" align="center" color="dark" gutterBottom>
          ID = {room}
        </Typography>
      </Box>
      {/* Cards components */}
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
          {/* Player 1 card */}
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

          {/* Player 2 card */}
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

        {/* Bame status bar */}
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
