import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../utils/theme";
// import RalewayWoff2 from "../utils/fonts/Raleway-Regular.woff2";
// import { Css } from "@mui/icons-material";

export default function LandingLayout({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <CssBaseline />
        <Box
          sx={{
            mt: 13,
            width: "100%",
            height: "100vh",
          }}
        >
          {children}
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  );
}
