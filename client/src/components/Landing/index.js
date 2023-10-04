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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import axios from "axios";
import YoutubeEmbed from "./YoutubeEmbed";

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

function Landing() {
  const [categoryArray, setCategoryArray] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Container className="Landing" sx={{ width: "90%" }}>
      <Box
        className="heading"
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Typography variant="h1" component="h1">
          Our Products
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12} sm={3} md={4}>
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
              This is a simple web app that allows you to explore data from the{" "}
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
        <Grid item xs={12} sm={9} md={8}>
          <Box
            className="video-responsive"
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "0",
              position: "relative",
              marginRight: "auto",
            }}
          >
            <YoutubeEmbed embedId="fIYW7OOeovk" />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="div">
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
    </Container>
  );
}

export default Landing;
