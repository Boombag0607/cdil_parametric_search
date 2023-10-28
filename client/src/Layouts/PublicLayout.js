import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Container, Breadcrumbs, Link, Typography, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import theme from "../utils/theme";
import { convertUrlToName } from "../lib/url";

export default function PublicLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container sx={{ width: "90%", mt: 12 }}>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb" sx={{ my: 3 }}>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            {useLocation()
              .pathname.split("/")
              .filter((path) => path !== "")
              .map((path) => {
                if (path === "search") {
                  return (
                    <Link underline="hover" color="inherit" href="/search">
                      <Typography
                        key={`search`}
                        underline="hover"
                        color="inherit"
                      >
                        Search
                      </Typography>
                    </Link>
                  );
                } else {
                  return (
                    <Typography underline="hover" color="inherit">
                      {convertUrlToName(path)}
                    </Typography>
                  );
                }
              })}
          </Breadcrumbs>
        </Box>
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
