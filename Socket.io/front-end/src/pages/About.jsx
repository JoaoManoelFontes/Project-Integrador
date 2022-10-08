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

export default function About() {
  const navigate = useNavigate();

  // ?Render
  return (
    <>
      <Header />
      <main>
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
              CONHEÇA
            </Typography>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
