import Footer from "../Components/Footer";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../utils/theme";

export default function LandingLayout({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            mt: 13,
            width: "100%",
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  );
}
