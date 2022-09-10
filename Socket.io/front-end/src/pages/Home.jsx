import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

import socket from "../services/client";
import { useNavigate } from "react-router-dom";

import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import MainPost from "../components/MainPost";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
  //?States & Hooks
  const [socketId, setSocketId] = useState(null);
  const [room, setRoom] = useState(null);
  const [status, SetStatus] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [roomError, setRoomError] = useState(null);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  //?Effects
  useEffect(() => {
    socket.on("roomGenerated", (data) => {
      setRoom(data.room);
      SetStatus(data.status);
    });

    socket.on("newRoom", (data) => setRooms(data));

    socket.on("roomJoined", (data) => {
      setRoom(data.room);
      SetStatus(data.status);
    });

    //? socket room errors
    socket.on("joinRoomError", (data) => {
      setRoomError(data);
      console.log(data);
    });
    socket.on("hostLeavesRoomError", (data) => setRoomError(data));

    socket.on("myId", (data) => setSocketId(data));
  }, [socket]);

  //? Handle Functions
  const generateRoom = () => {
    socket.emit("generateRoom");
  };

  const handleBattle = () => {
    socket.emit("battle");
  };

  const handleJoin = () => {
    socket.emit("joinRoom", roomId);
  };

  return (
    <>
      <Header />
      <main>
        <MainPost />
        <br />
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              OU
            </Typography>
            <br />
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={generateRoom}>
                Criar uma sala
              </Button>
              <TextField
                id="outlined-basic"
                label="Entrar em uma sala"
                variant="outlined"
                placeholder="Digite o id da sala..."
                onChange={(e) => {
                  setRoomId(e.target.value);
                }}
              />
              <Button variant="outlined" onClick={handleJoin}>
                Entrar
              </Button>
              {/*?Redirecionar para a sala do jogo*/}
              {room != null && status != null && socketId != null
                ? navigate("/game", {
                    state: {
                      room,
                      status,
                      socketId,
                    },
                  })
                : null}
            </Stack>
            {roomError && (
              <Stack
                style={{ marginTop: "5%" }}
                sx={{ width: "100%" }}
                spacing={2}
              >
                <Alert variant="outlined" severity="error">
                  {roomError}
                </Alert>
              </Stack>
            )}
            {rooms.length > 0 ? (
              rooms.map((room, index) => {
                return (
                  <div key={index}>
                    <h3>Sala {index + 1}</h3>
                    <p>id: {room}</p>
                    <button
                      onClick={() => {
                        socket.emit("joinRoom", room);
                      }}
                    >
                      Entrar na sala
                    </button>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
