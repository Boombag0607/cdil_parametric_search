import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
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
import NotFound from "../NotFound";
import { convertNameToUrl, convertUrlToName } from "../../lib/url";

export default function ShowSubCats() {
  const [categoryArray, setCategoryArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const getShowSubCatsData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${process.env.ENDPOINT_PREFIX}/categories`
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
        setError(true);
        console.error(err.message);
      }
    };
    getShowSubCatsData();
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
    <Box>
      {error ? (
        <NotFound />
      ) : (
        <Box>
          <Typography variant="h4" component="h4">
            {convertUrlToName(category)}
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
                              to={`/search/${convertNameToUrl(type)}`}
                            >
                              <ListItemIcon>
                                <ListItemText
                                  sx={{ color: "text.primary" }}
                                  primary={type}
                                />
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
      )}
    </Box>
  );
}
