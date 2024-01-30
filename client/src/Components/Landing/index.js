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
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import YoutubeEmbed from "./YoutubeEmbed";
import {
  DiodeIcon,
  ShieldIcon,
  PackageIcon,
  TransistorIcon,
} from "../../utils/icons/icons";

import { Logo } from "../../utils/constants/components";
import { Link } from "react-router-dom";
import {
  StyledLink,
  AppBar,
  Drawer,
  ListItemText,
  DrawerHeader,
  LandingListItem
} from "../../utils/constants/components";
import { landing } from "../../utils/constants/data";
import { convertNameToUrl } from "../../lib/url";
import { extractStringsInQuotes } from "../../lib/string";

function Landing() {
  const [categoryArray, setCategoryArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);

  useEffect(() => {
    const getLandingData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/categories`
        );
        const categoriesData = categoriesResponse.data.map((dataElement) => {
          return {
            name: dataElement.name,
            types: extractStringsInQuotes(dataElement.subcat),
          };
        });
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
          <LandingListItem
            name="All Packages"
            drawerOpen={categoryDrawerOpen}
            icon={<PackageIcon />}
            href="packages"
          />

          <LandingListItem
            name="Diodes"
            drawerOpen={categoryDrawerOpen}
            icon={<DiodeIcon />}
            href="diodes"
          />

          <LandingListItem
            name="Transistors"
            drawerOpen={categoryDrawerOpen}
            icon={<TransistorIcon />}
            href="transistors"
          />
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
                {landing.description}
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
            sx={{ fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" }, my: 5 }}
          >
            Browse By Category
          </Typography>
          {loading ? (
            <Box sx={{ my: 5 }}>
              <LinearProgress />
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ my: 5 }}>
              {categoryArray.map((categoryObject, categoryIndex) => (
                <Grid item xs={6} className="col" key={"col" + categoryIndex}>
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
                            <ListItem
                              disablePadding
                              key={typeIdx}
                              sx={{ overflowX: "hidden" }}
                            >
                              <ListItemButton
                                component={Link}
                                to={`/search/${convertNameToUrl(type)}`}
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
                        <Button
                          href={`/${convertNameToUrl(categoryObject.name)}`}
                        >
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
