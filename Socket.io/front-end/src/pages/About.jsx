// ? material imports
import { Typography, Container, Box } from "@mui/material";

//? Components render imports
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";

export default function About() {
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
