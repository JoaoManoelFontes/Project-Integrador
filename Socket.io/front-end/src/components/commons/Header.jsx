import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppBar } from "@mui/material";
import Link from '@mui/material/Link';

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ borderBottom: 3, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link href="/" underline="none" style={{ color: "#FFF"}}>
            CardGame
          </Link>
        </Typography>
        <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: "space-between", overflowX: "auto" }}
        >
          <Typography
            variant="h7"
            color="inherit"
            sx={{ p: 1, flexShrink: 0 }}
            noWrap
          >
            <Link href="/about" underline="none" style={{ color: "#FFF"}}>Sobre</Link>
          </Typography>
          <Typography
            variant="h7"
            color="inherit"
            sx={{ p: 1, flexShrink: 0 }}
            noWrap
          >
            Conecte-se
          </Typography>
          <Typography
            variant="h7"
            color="inherit"
            sx={{ p: 1, flexShrink: 0 }}
            noWrap
          >
            Cartinhas
          </Typography>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
}
