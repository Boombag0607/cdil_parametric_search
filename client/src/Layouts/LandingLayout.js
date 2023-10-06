import Footer from "../Components/Footer";
import { Box} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { ThemeProvider, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../utils/theme";
// import RalewayWoff2 from "../utils/fonts/Raleway-Regular.woff2";
// import { Css } from "@mui/icons-material";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: 230,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
}));

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
          <Drawer ></Drawer>
          {children}
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  );
}
