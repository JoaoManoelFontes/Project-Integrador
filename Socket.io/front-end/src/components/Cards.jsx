// ? React hooks imports
import { useState } from "react";

// ? Material imports
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { Container } from "@mui/system";

// ? socket client import
import socket from "../services/client";

export default function Cards(props) {
  // ? props
  const { state, room, socketId } = props;

  //?States
  const [playerCard, setPlayerCard] = useState(null);

  //? handle functions

  const handleChange = (e) => {
    // ? Manda a caritnha que o player escolheu em forma de json pro state
    setPlayerCard(JSON.parse(e.target.value));
  };

  const handleFormSend = () => {
    // ? Manda a cartinha escolhida para o socket, não pode mais trocar de carta
    socket.emit("sendCard", {
      playerCard,
      room: room,
      id: socketId,
    });
  };

  return (
    <Container
        direction="column"
        justifyContent="center"
        alignItems="center"
        align="center"
        sx={{ marginBottom: "32px" }}
      >
      {/* Card header */}
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="primary"
        sx={{ fontWeight: "bold", margin: "5%" }}
        gutterBottom
      >
        Escolha Sua Carta
      </Typography>
      <br />
      <Container
        maxWidth="lg"
        sx={{
          marginBottom: "5%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {/* Cards list */}
        {state?.map((card, index) => {
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

                  {/* Cards attributes form */}
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
        
      </Container>
      {/* Choose card button - HAVE TO RELOCATE */}
      {playerCard && <Button variant="contained" onClick={handleFormSend}>Play</Button>}
    </Container>
  );
}
