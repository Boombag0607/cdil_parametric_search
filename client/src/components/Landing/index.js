import React, { useState, useEffect, useCallback } from "react";
import "./Landing.css";
import { styled } from "@mui/material/styles";
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

const StyledTypography = styled(Typography)({
  marginLeft: "5%",
  marginRight: "5%",
});

const ActionBox = styled(Box)({
  width: "100%",
  minHeight: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

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
    <Box className="Landing">
      <StyledTypography variant="h1" component="h1">
        Our Products
      </StyledTypography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "35vh",
          backgroundColor: "#eee",
          my: 2,
        }}
      >
        <ActionBox sx={{ ml: 10 }}>
          <Typography>
            This is a simple web app that allows you to explore data from the{" "}
            <Link href="https://www.cdil.com/" target="_blank" rel="noreferrer">
              CDIL
            </Link>{" "}
            website.
          </Typography>
          <ActionBox
            sx={{
              width: "100%",
              height: "10vh",
            }}
          >
            <Button
              variant="contained"
              href="/search"
              sx={{ height: "3em", width: "15em" }}
            >
              Go to Main Search
            </Button>
          </ActionBox>
        </ActionBox>
        <Box
          className="video-responsive"
          sx={{
            width: "100%",
            height: "0",
            position: "relative",
            marginRight: "auto",
          }}
        >
          <YoutubeEmbed embedId="fIYW7OOeovk" />
        </Box>
      </Box>
      <Box>
        <StyledTypography variant="h4" component="div">
          Browse By Category
        </StyledTypography>
        {loading ? (
          <ActionBox>
            <LinearProgress />
          </ActionBox>
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
                    <StyledTypography>{categoryObject.name}</StyledTypography>
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
  );
}

export default Landing;
