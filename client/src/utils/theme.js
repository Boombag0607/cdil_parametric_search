import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontSize: 14,
    h1: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#222",
      fontFamily: "Raleway",
    },
    body1: {
      color: "#666", 
      fontFamily: "Roboto",
    },
    button: {
      fontWeight: 600,
    },
    a: {
      fontColor: "#27c7ff", 
      fontWeight: 700, 
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
      color: "#222",
      fontFamily: "Raleway",
    },
  },
  palette: {
    background: {
      default: "#fff",
    },
    primary: {
      main: "#f0b128", 
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: "#333",
    },
    action: {
      activeOpacity: 1,
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#27c7ff",
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
