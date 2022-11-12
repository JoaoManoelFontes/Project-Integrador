import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#281c14", //, #361500, #281c14, #CC9544
    },
    secondary: { main: "#f09963d8" },
    footer: { main: "#60350165" },
  },
  typography: {
    fontFamily: "'Nunito', 'Ubuntu'",
  },
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
});
