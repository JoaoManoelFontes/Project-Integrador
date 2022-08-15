import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

import socket from "../assets/client";

import { useNavigate } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Home() {
  //?States & Hooks
  const [socketId, setSocketId] = React.useState(null);
  const [room, setRoom] = React.useState(null);
  const [status, SetStatus] = React.useState(null);
  const [roomId, setRoomId] = React.useState("");
  const [roomError, setRoomError] = React.useState(null);
  const [rooms, setRooms] = React.useState([]);

  const navigate = useNavigate();

  //?Effects
  React.useEffect(() => {
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

  const handleJoin = () => {
    socket.emit("joinRoom", roomId);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            CardGame
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
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
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              CardGame
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={generateRoom}>
                Criar uma sala
              </Button>
              {/* ------Quebrar linha aqui!!!-----  */}
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
                <Alert severity="error">{roomError}</Alert>
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
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>

      {/* End footer */}
    </ThemeProvider>
  );
}
