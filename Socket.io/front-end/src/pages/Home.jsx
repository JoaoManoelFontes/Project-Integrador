// ? react hooks imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ? material imports
import {
  Button,
  Typography,
  Stack,
  Container,
  TextField,
  Alert,
  Box,
} from "@mui/material";

// ? socket client import
import socket from "../services/client";

//? Components render imports
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import MainPost from "../components/MainPost";

export default function Home() {
  //?States & Hooks
  const [socketId, setSocketId] = useState(null);
  const [room, setRoom] = useState(null);
  const [status, SetStatus] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [roomError, setRoomError] = useState(null);
  // const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  //?Effects

  useEffect(() => {
    // ?Socket actions
    socket.on("roomGenerated", (data) => {
      setRoom(data.room);
      SetStatus(data.status);
    });

    // socket.on("newRoom", (data) => setRooms(data));

    socket.on("roomJoined", (data) => {
      setRoom(data.room);
      SetStatus(data.status);
    });

    //? socket room errors
    socket.on("joinRoomError", (data) => setRoomError(data));

    socket.on("hostLeavesRoomError", (data) => setRoomError(data));

    socket.on("myId", (data) => setSocketId(data));
  }, [socket]);

  //? Handle Functions

  const generateRoom = () => {
    socket.emit("generateRoom");
  };

  const handleJoin = () => {
    socket.emit("joinRoom", roomId);
  };

  // ?Render
  return (
    <>
      <Header />
      <main>
        <MainPost />
        <br />
        {/* enter a room form   */}
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
                color="secondary"
                onChange={(e) => {
                  setRoomId(e.target.value);
                }}
              />
              <Button variant="outlined" color="secondary" onClick={handleJoin}>
                Entrar
              </Button>
            </Stack>

            {/* Errors component */}
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

            {/* Redirect to the game room */}

            {room != null && status != null && socketId != null
              ? navigate("/game", {
                  state: {
                    room,
                    status,
                    socketId,
                  },
                })
              : null}

            {/* Show avaliable rooms - not in use */}

            {/* {rooms.length > 0 ? (
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
            )} */}
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
