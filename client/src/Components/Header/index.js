import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material"; // Import Box component
import { Logo } from "../../utils/constants";

const AppBar = (props) => (
  <MuiAppBar
    elevation={0}
    position="static"
    {...props}
    sx={{ border: "1px solid #ddd", background: "white", color: "#222" }}
  />
);

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Logo */}
        <Logo />
        {/* Navbar below the logo */}
        <Box sx={{ marginLeft: "auto" }}>
          <Typography variant="h4" noWrap component="div">
            {" "}
            Parametric Search
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
