import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  LinearProgress,
  Box,
  Grid,
  Button,
  Container,
  Toolbar,
  Divider,
  IconButton,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MuiLink from "@mui/material/Link";
import MuiListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import YoutubeEmbed from "./YoutubeEmbed";
import CableIcon from "../../icons/CableIcon";
import { LANDINGDRAWERWIDTH, Logo } from "../../utils/constants";
import { Link } from "react-router-dom";
// import  from "../../utils/constants"

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

const StyledLink = styled(MuiLink)({
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

const Drawer = styled(MuiDrawer, {
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

const DrawerHeader = styled("div")(({ theme }) => ({
  backgroundColor: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled((props) => (
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

const ListItemText = styled(MuiListItemText)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  overflowX: "hidden",
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
    <Container className="Landing" sx={{ display: "flex", maxWidth: "95%" }}>
      <AppBar position="fixed" open={categoryDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(categoryDrawerOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ...(categoryDrawerOpen && { ml: 6 }) }}
          >
            <Logo />
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
              <ListItemText primary="High Reliability Devices" />
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
              <ListItemText primary="High Reliability Devices" />
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
                With 50 years of semiconductor manufacturing experience, strict
                standards of quality, constant improvements in R&D, technology,
                and processes, and the hard work of a team of dedicated
                professionals, CDIL today is an Indian brand that is recognized
                globally. This is a simple website application that allows you
                to explore data from the{" "}
                <StyledLink
                  href="https://www.cdil.com/"
                  target="_blank"
                  rel="noreferrer"
                  sx={{ color: "#f0b128", underline: "hover" }}
                >
                  main website
                </StyledLink>
                .
              </Typography>
              <Box sx={{ my: 2 }}>
                <Button variant="contained" href="/search">
                  Search Now
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
