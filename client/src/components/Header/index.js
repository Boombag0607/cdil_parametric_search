import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material"; // Import Box component

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ background: "white" }}>
      <Toolbar>
        {/* Logo */}
        <img
          src={"/imgs/logo.png"}
          alt={"CDIL"}
          width="100"
          style={{ margin: "0 15px" }}
        />
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
