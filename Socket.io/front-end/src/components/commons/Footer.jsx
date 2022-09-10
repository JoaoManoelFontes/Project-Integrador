import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <>
      <br />
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "footer.main",
        p: 3,
      }}
      component="footer"
    >
      <Typography variant="h6" align="center" gutterBottom>
        CardGame
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.primary"
        component="p"
      >
        O melhor jogo de cartas ntf!
      </Typography>
      <Copyright />
    </Box>
  );
}
