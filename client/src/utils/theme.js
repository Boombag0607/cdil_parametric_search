import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {},
    },
  },
  // overrides: {
  //   MuiButton: {
  //     raisedPrimary: {
  //       color: "white",
  //     },
  //   },
  // },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#222",
      fontFamily: "Raleway",
    },
    body1: {
      color: "#666", // Body text color
      fontFamily: "Roboto",
    },
    button: {
      fontWeight: 600,
    },
    a: {
      fontColor: "#f0b128", // Link text color
      fontWeight: 600, // Bold font weight for links
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "#222",
      fontFamily: "Raleway",
    },
  },
  palette: {
    primary: {
      main: "#f0b128", // Set the primary color to #f0b128
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: "#333",
    },
  },
});

export default theme;
