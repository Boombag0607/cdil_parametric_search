import React, { useState, useEffect, useCallback } from "react";
import "./Landing.css";
// import { styled } from "@mui/material/styles";
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
  CircularProgress,
  Box,
  Grid,
  Button,
} from "@mui/material";
// import MuiAccordion from "@mui/material/Accordion";
// import MuiAccordionSummary from "@mui/material/AccordionSummary";
// import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import BoltIcon from "@mui/icons-material/Bolt";
import { Link } from "react-router-dom";
import axios from "axios";

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
    <Box className="landing container m-4">
      <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
        Our Products
      </Typography>
      <Box sx={{ height: "50vh", backgroundColor: "#eee", right: 0, left: 0 }}>
        <Grid container sx={{ m: 1, p: 1 }}>
          <Grid item>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus distinctio corrupti nam nostrum! Recusandae
            reprehenderit magnam asperiores possimus maiores delectus? Quae,
            reprehenderit voluptates. Alias tempora corporis fugiat quasi
            nesciunt distinctio.<br></br>
          </Grid>
          <Grid item>
            <Button href="/search">Go to Main Search</Button>
          </Grid>
        </Grid>
      </Box>
      <Typography sx={{ m: 4 }}>
        This is a simple web app that allows you to explore data from the{" "}
        <Link href="https://www.cdil.com/" target="_blank" rel="noreferrer">
          CDIL
        </Link>{" "}
        website.
      </Typography>
      <Box>
        <Typography component="" variant="h4" sx={{ m: 4 }}>
          Browse By Category
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            container
            spacing={2}
            className="m-1 p-1"
            // columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
          >
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
                                {/* <BoltIcon /> */}
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
