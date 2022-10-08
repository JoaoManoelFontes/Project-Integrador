import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#593016",
    },
    secondary: { main: "#67b7d6" },
    footer: { main: "#A8795B" },
  },
  typography: {
    fontFamily: "'Nunito', 'Ubuntu'",
  },
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
});
