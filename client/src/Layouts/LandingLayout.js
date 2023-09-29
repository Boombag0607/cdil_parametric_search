import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Box } from "@mui/material";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Define your custom theme with the specified styles
const theme = createTheme({
  typography: {
    fontFamily: {
      // Set a specific font family for headings
      heading: "'Raleway', sans-serif",
      // Set a different font family for paragraph text
      body: "'Georgia', serif",
    },
    // fontSize: "30px",
    // fontWeight: 300,
    h1: {
      fontSize: "3.5em", // Heading font size
      color: "#000", // Heading color
      fontWeight: 300, // Heading font weight
    },
  },
  // components: {
  //   MuiTypography: {
  //     styleOverrides: {
  //       root: {
  //         color: "rgb(0, 0, 0)",
  //         display: "block",
  //         height: "36px",
  //         letterSpacing: "normal",
  //         lineHeight: "36px",
  //         textAlign: "left",
  //         textTransform: "none",
  //         whiteSpace: "normal",
  //         width: "343px",
  //         // Add other styles here as needed
  //       },
  //     },
  //   },
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         color: "#222", // Button color
  //       },
  //     },
  //   },
  //   MuiInput: {
  //     styleOverrides: {
  //       root: {
  //         color: "#222", // Input color
  //       },
  //     },
  //   },
  //   MuiTextarea: {
  //     styleOverrides: {
  //       root: {
  //         color: "#222", // Textarea color
  //       },
  //     },
  //   },
  //   MuiSelect: {
  //     styleOverrides: {
  //       root: {
  //         color: "#222", // Select color
  //       },
  //     },
  //   },
  // },
  // Global CSS
  overrides: {
    MuiCssBaseline: {
      "@global": {
        // Add global CSS styles here
      },
    },
  },
});

export default function PublicLayout({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Box sx={{ width: "100%", mt: 10 }}>{children}</Box>
        <Footer />
      </ThemeProvider>
    </>
  );
}
