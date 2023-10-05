import React, { useState, useEffect, useCallback } from "react";
import "./Landing.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Box,
  Grid,
  Button,
  Container,
  Toolbar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiDrawer from "@mui/material/Drawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import axios from "axios";
import YoutubeEmbed from "./YoutubeEmbed";
import CableIcon from "../../icons/Cable";

const DRAWERWIDTH = 280;

// const Accordion = styled((props) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&:before": {
//     display: "none",
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? "rgba(255, 255, 255, .05)"
//       : "rgba(0, 0, 0, .03)",
//   flexDirection: "row-reverse",
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     transform: "rotate(180deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: "1px solid rgba(0, 0, 0, .125)",
// }));

// const ActionBox = styled(Box)({
//   width: "100%",
//   minHeight: "50px",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
// });

const openedMixin = (theme) => ({
  width: DRAWERWIDTH,
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWERWIDTH,
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

const DrawerHeader = styled("div")(({ theme }) => ({
  backgroundColor: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "white",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWERWIDTH,
    width: `calc(100% - ${DRAWERWIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Landing() {
  const [categoryArray, setCategoryArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);

  useEffect(() => {
    const getLandingData = async () => {
      try {
        const categoriesResponse = await axios.get(
          "http://localhost:3000/categories"
        );
        const categoriesData = categoriesResponse.data.map((dataElement) => {
          return {
            name: dataElement.name,
            types: dataElement.sub_cat,
          };
        });
        console.log(categoriesData);
        setCategoryArray(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    getLandingData();
  }, []);

  const checkLoading = useCallback(() => {
    if (loading) {
      setTimeout(checkLoading, 100);
    }
  }, [loading]);

  useEffect(() => {
    checkLoading();
  }, [checkLoading]);

  const handleDrawerOpen = () => {
    setCategoryDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setCategoryDrawerOpen(false);
  };

  return (
    <Container className="Landing" sx={{ display: "flex", width: "100%" }}>
      <AppBar position="fixed" open={categoryDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 4,
              ...(categoryDrawerOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mx: categoryDrawerOpen ? 7 : 0 }}
          >
            <img src={"/imgs/logo.png"} alt={"CDIL"} width={"100"} />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={categoryDrawerOpen}
        sx={{ zIndex: (theme) => theme.zIndex - 1 }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {categoryDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: categoryDrawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: categoryDrawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CableIcon />
              </ListItemIcon>
              <ListItemText primary="High Relaibility Devices" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding key={`Add Another Admin`}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: categoryDrawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: categoryDrawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CableIcon />
              </ListItemIcon>
              <ListItemText primary="High Relaibility Devices" />
            </ListItemButton>
          </ListItem>
          {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: profileDrawerOpen ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: profileDrawerOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <Box component="main" open={categoryDrawerOpen}>
        <Box
          className="heading"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontSize: { xs: "2rem", sm: "2rem", md: "3rem" } }}
          >
            Our Products
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ my: 2, minHeight: "35vh" }}>
          <Grid item xs={12} sm={4} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography>
                This is a simple web app that allows you to explore data from
                the{" "}
                <Link
                  href="https://www.cdil.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  CDIL
                </Link>{" "}
                website.
              </Typography>
              <Box sx={{ my: 5 }}>
                <Button variant="contained" href="/search">
                  Go to Main Search
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Box
              className="video"
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: { md: "100%" },
              }}
            >
              <YoutubeEmbed embedId="fIYW7OOeovk" />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" } }}
          >
            Browse By Category
          </Typography>
          {loading ? (
            <Box sx={{ my: 5 }}>
              <LinearProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {categoryArray.map((categoryObject, categoryIndex) => (
                <Grid item className="col" key={"col" + categoryIndex}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{categoryObject.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container direction="column">
                        <List>
                          {categoryObject.types.map((type, typeIdx) => (
                            <ListItem disablePadding key={typeIdx}>
                              <ListItemButton
                                component={Link}
                                to={`/search/${type.split(" ").join("_")}`}
                              >
                                <ListItemIcon>
                                  <ListItemText
                                    disableTypography
                                    primary={type}
                                  />
                                </ListItemIcon>
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                        <Button href={`/${categoryObject.name}`}>
                          Select All
                        </Button>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Landing;
