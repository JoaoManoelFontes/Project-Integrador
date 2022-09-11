import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { useEffect, useState } from "react";

import socket from "../services/client";

export default function Cards(props) {
  const { state, room, socketId } = props;

  //?States
  const [playerCard, setPlayerCard] = useState(null);

  //? handle functions
  const handleChange = (e) => {
    setPlayerCard(JSON.parse(e.target.value));
  };

  const handleFormSend = () => {
    socket.emit("sendCard", {
      playerCard,
      room: room,
      id: socketId,
    });
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          marginBottom: "5%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
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

      {playerCard && <Button onClick={handleFormSend}>Click</Button>}
    </>
  );
}
