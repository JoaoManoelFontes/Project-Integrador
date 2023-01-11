// ? React hooks imports
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// ? Components render imports
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";

// ? Material imports
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

export default function Game() {
  //?states & hooks
  const { state } = useLocation();
  const [resultButton, setResultButton] = useState("");
  const [shadowColor1, setShadowColor1] = useState("#b3c4cf");
  const [textCard1, setTextCard1] = useState("");

  const [shadowColor2, setShadowColor2] = useState("#b3c4cf");
  const [textCard2, setTextCard2] = useState("");

  //?effects
  useEffect(() => {
    // ? Mudando a cor e o texto das cartinhas de acordo com o vencedor e o perdedor

    // ? Se o id da página for o id que o server retornou como vencedor
    if (state.winner.winner != null && state.winner.winner === state.socketId) {
      setShadowColor1("#39b820");
      setTextCard1("Venceu a batalha!");

      setResultButton("Receber a recompensa");

      setShadowColor2("#7e2e28");
      setTextCard2("Perdeu a batalha!");
      // ? Se o server retornou null
    } else if (state.winner.winner === null) {
      setShadowColor1("#f09963");
      setTextCard1("A batalha empatou!");

      setResultButton("Ir para o menu principal");

      setShadowColor2("#f09963");
      setTextCard2("A batalha empatou!");
    } else {
      setShadowColor1("#7e2e28");
      setTextCard1("Perdeu a batalha!");

      setResultButton("Ir para o menu principal");

      setShadowColor2("#39b820");
      setTextCard2("Venceu a batalha!");
    }
  }, []);

  // ? Render
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="md" sx={{ marginTop: "8%" }}>
          <Box sx={{ marginBottom: "5%" }}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="secondary"
              sx={{ fontWeight: "bold" }}
            >
              RESULTADO DA BATALHA
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="primary"
              gutterBottom
            >
              SALA: {state.room}
            </Typography>
          </Box>
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: " 0 0 0.5em",
              marginBottom: "5%",
              backgroundImage: "linear-gradient(#1d0b0081, #2e2c2c);",
            }}
            bgcolor="#311503"
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
                  <Typography variant="body2">{textCard1}</Typography>
                </CardContent>
              </Card>

              <Typography
                component="h1"
                variant="h3"
                align="center"
                color="secondary"
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
                  <Typography variant="body2">{textCard2}</Typography>
                </CardContent>
              </Card>
            </Box>
            <Box>
              <Typography
                variant="h5"
                align="center"
                color="secondary"
                sx={{
                  margin: "5%",
                  padding: "5%",
                  fontWeight: "bold",
                  borderTop: "solid",
                }}
              >
                {state.status}
              </Typography>
            </Box>
          </Box>

          {/* Result button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "3% 0 5% 0",
            }}
          >
            <Button
              variant="contained"
              sx={{
                boxShadow: " 10px 5px 4px #252424ce",
                width: "20%",
              }}
            >
              <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
                <Typography
                  variant="h8"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {resultButton}
                </Typography>
              </Link>
            </Button>
            {/* </Link> */}
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}
