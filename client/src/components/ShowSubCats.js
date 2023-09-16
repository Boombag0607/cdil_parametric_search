import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./Landing.css";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
// import BoltIcon from "@mui/icons-material/Bolt";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchTableWithCat from "./CatSearchTable";

function Landing() {
  const [categoryArray, setCategoryArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const getLandingData = async () => {
      try {
        const categoriesResponse = await axios.get(
          "http://localhost:3000/categories"
        );
        const filteredCategories = categoriesResponse.data.filter(
          (categoryElement) => categoryElement.name === category
        );
        const filteredSubCategoriesArray = filteredCategories.map(
          (filteredCategoryElement) => {
            return {
              name: filteredCategoryElement.name,
              types: filteredCategoryElement.sub_cat,
            };
          }
        );
        console.log(filteredSubCategoriesArray);
        setLoading(false);

        setCategoryArray(filteredSubCategoriesArray);
      } catch (err) {
        console.error(err.message);
      }
    };
    getLandingData();
  }, [category]);

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
      <Typography variant="h4" component="h4">
        {category}
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex" }}>
          <Grid container spacing={2} className="mt-1 p-1">
            {categoryArray.map((categoryObject, categoryIndex) => (
              <Grid item xs={3} className="col" key={"col" + categoryIndex}>
                <Grid container direction="column">
                  <List>
                    {categoryObject.types.map((type, typeIdx) => (
                      <ListItem disablePadding key={typeIdx}>
                        <ListItemButton
                          component={Link}
                          to={`/search/${type.split(" ").join("_")}`}
                        >
                          <ListItemIcon>
                            <ListItemText sx={{ color: 'text.primary' }} primary={type} />
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={9}>
              <SearchTableWithCat category={category} />
            </Grid>
          </Grid>
        </Box>
      )}
      <Button href="/search">Go to Main Search</Button>
    </Box>
  );
}

export default Landing;
