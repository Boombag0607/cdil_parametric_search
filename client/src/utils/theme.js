import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    h1: {
      fontSize: "4rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "2rem",
      fontWeight: 400,
    },
  },
});

export default theme;