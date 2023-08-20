import React, { useState, useEffect, useCallback } from "react";
import "./Landing.css";
import { styled } from "@mui/material/styles";
import {
  //   Accordion,
  //   AccordionSummary,
  //   AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BoltIcon from "@mui/icons-material/Bolt";
import {Link} from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const divideArray = async (array, size) => {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  console.log(result);
  return result;
};

function Landing() {
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getLandingData = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        const jsonData = await response.json();
        console.log(jsonData);
        setLoading(false);

        const dataAsArray = await divideArray(jsonData, 3);
        setDisplayData(dataAsArray);
      } catch (err) {
        console.error(err.message);
      }
    };
    getLandingData();
  }, []);

  const checkLoading = useCallback(() => {
    if (loading) {
      // If loading is true, wait and check again
      setTimeout(checkLoading, 100);
    }
  }, [loading]);

  useEffect(() => {
    checkLoading();
  }, [checkLoading]);

  return (
    <div className="landing container m-4">
      <h1>Parametric Search</h1>
      <p className="lead">
        This is a simple web app that allows you to explore data from the{" "}
        <a href="https://www.cdil.com/" target="_blank" rel="noreferrer">
          CDIL
        </a>{" "}
        website.
      </p>
      <div>
        {console.log("inside", displayData)}
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
            displayData.map((row, rowIndex) => (
              <div className="row mt-1 mb-3" key={rowIndex}>
                {row.map((element, colIdx) => (
                  <div className="col" key={"col" + colIdx}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{element.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container direction="column">
                          <List>
                            {element.types.map((type, typeIdx) => (
                              <ListItem disablePadding key={typeIdx}>
                                <ListItemButton component={Link} to={`/table?device=${type}`}>
                                  <ListItemIcon>
                                    <BoltIcon />
                                    <ListItemText disableTypography primary={type} />
                                  </ListItemIcon>
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                          </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
              </div>
            ))
          )}
      </div>
    </div>
  );
}

export default Landing;
