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
      color: "#666", // Body text color
      fontFamily: "Roboto",
    },
    button: {
      fontFamily: "Roboto",
      fontWeight: 600
    },
    a: {
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
    },
  },
});

export default theme;
