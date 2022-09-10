import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#786ff5",
    },
    secondary: { main: "#67b7d6" },
    footer: { main: "#e5f1f5be" },
  },
  typography: {
    fontFamily: "'Nunito', 'Ubuntu'",
  },
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
});
