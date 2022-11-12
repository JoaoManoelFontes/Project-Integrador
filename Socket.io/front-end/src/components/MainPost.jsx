import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import Container from "@mui/material/Container";

import socket from "../services/client";

export default function MainPost() {
  //? Handle Functions
  const handleBattle = () => {
    socket.emit("battle");
  };

  //?Render
  return (
    <Container maxWidth="sx" sx={{ marginTop: 10 }}>
      <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
        <Paper
          sx={{
            position: "relative",
            mb: 1,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            //backgroundImage:
            //  "url(https://img.freepik.com/free-vector/holographic-abstract-background_598544-119.jpg?w=2000)",
            backgroundImage: "linear-gradient(#683401, #854306, #dc9426);",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(10px)",
            boxShadow: "5px 8px 5px #3434345e",
          }}
        >
          <div id="item_title" style={{ padding: "4%" }}>
            <Typography
              component="h1"
              variant="h3"
              color="white"
              gutterBottom
              align="left"
            >
              Bem-vindo ao Encounter
            </Typography>
            <Typography variant="h5" color="white" align="left" paragraph>
              O melhor jogo de cartas NFT!
            </Typography>
          </div>
          <div id="item_button" style={{ paddingRight: "20%" }}>
            <Button
              onClick={handleBattle}
              variant="contained"
              sx={{
                boxShadow: " 10px 5px 4px #252424ce",
                width: "200%",
                padding: "20%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Batalhar
              </Typography>
            </Button>
          </div>
        </Paper>
      </Grow>
    </Container>
  );
}
