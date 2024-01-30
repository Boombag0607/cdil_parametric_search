import { Box, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import MuiListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

export const LOGOWIDTH = 100;
export const LANDINGDRAWERWIDTH = 270;
export function Logo() {
  return <img src={"/imgs/logo-yellow.png"} alt={"CDIL"} width={LOGOWIDTH} />;
}
export function NotFoundImage() {
  return (
    <img
      src="/imgs/404.png"
      alt="404.png"
      style={{ width: "100%", height: "auto", position: "relative" }}
    />
  );
}

export const ListItemText = styled(MuiListItemText)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  overflowX: "hidden",
}));

export function LandingListItem({ name, drawerOpen, icon, href }) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: drawerOpen ? "initial" : "center",
          px: 2.5,
        }}
        component={Link}
        to={`/${href}`}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: drawerOpen ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}

export const BULL = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "5px", transform: "scale(1.2)" }}
  >
    •
  </Box>
);

export const StyledLink = styled(MuiLink)({
  textDecoration: "none",
  color: "#f0b128",
  underline: "hover",
  fontWeight: 700,
});

const openedMixin = (theme) => ({
  width: LANDINGDRAWERWIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: LANDINGDRAWERWIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  backgroundColor: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const AppBar = styled((props) => (
  <MuiAppBar
    {...props}
    elevation={0}
    position="fixed"
    sx={{ border: "1px solid #ddd", background: "white", color: "#222" }}
  />
))(({ theme, open }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: LANDINGDRAWERWIDTH,
    width: `calc(100% - ${LANDINGDRAWERWIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const palette = {
  primary: {
    main: "#f0b128",
    contrastText: "#fff",
  },
  secondary: {
    main: "#154f8a",
    contrastText: "#fff",
  },
  links: {
    active: "#27c7ff",
    secondaryNav: "#636363",
  },
  title: {
    main: "#154f8a",
  },
};
