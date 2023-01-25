// ? React hooks imports
import { useState, useEffect } from "react";

// ? Material imports
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

// ? Service import - getting cards api through axios
import api from "../services/api";

export default function Carrousel() {
  const [cards, setCards] = useState(null);

  // ? Effects
  useEffect(() => {
    api
      .get()
      .then(({ data }) => {
        setCards([data.cards[0], data.cards[1], data.cards[0], data.cards[1]]);
      })
      .catch((err) => {
        console.log(err.response.body);
      });
  });

  return (
    <Container
      maxWidth="xlg"
      sx={{
        marginTop: "5%",
        padding: "2%",
        backgroundImage: "linear-gradient(#FFFFFF , #eacda3, #F4E2D8, #ffff);",
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        align="center"
        color="primary"
        sx={{
          fontWeight: "bold",
        }}
      >
        Nossos Personagens
      </Typography>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "5%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {cards?.map((card, index) => {
          return (
            <div key={index}>
              <Card
                style={{ marginTop: "5%", backgroundColor: "#6e5849b8" }}
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
                </CardContent>
                <List>
                  <ListItem key={card.strong + index}>
                    <ListItemText>Strong: {card.strong}</ListItemText>
                  </ListItem>
                  <ListItem key={card.speed + index}>
                    <ListItemText>Speed: {card.speed}</ListItemText>
                  </ListItem>
                  <ListItem key={card.agility + index}>
                    <ListItemText>Agility: {card.agility}</ListItemText>
                  </ListItem>
                  <ListItem key={card.smartness + index}>
                    <ListItemText>Smartnees: {card.smartness}</ListItemText>
                  </ListItem>
                </List>
              </Card>
            </div>
          );
        })}
      </Container>
    </Container>
  );
}
