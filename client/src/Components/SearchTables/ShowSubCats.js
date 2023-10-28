import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import CatSearchTable from "./CatSearchTable";
import NotFound from "../NotFound";
import { convertNameToUrl, convertUrlToName } from "../../lib/url";
import { removeCategorySuffix } from "../../lib/name";

export default function ShowSubCats() {
  const [categoryArray, setCategoryArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const getShowSubCatsData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/categories`
        );
        const filteredCategories = categoriesResponse.data.filter(
          (categoryElement) =>
            categoryElement.name === convertUrlToName(category)
        );
        const filteredSubCategoriesArray = filteredCategories.map(
          (filteredCategoryElement) => {
            return {
              name: filteredCategoryElement.name,
              types: filteredCategoryElement.sub_cat.types,
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
        <Box sx={{ minHeight: "60vh" }}>
          <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
            {convertUrlToName(category)}
          </Typography>
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "flex" }}>
              <Grid container spacing={2}>
                {categoryArray.map((categoryObject, categoryIndex) => (
                  <Grid
                    item
                    md={3}
                    sm={12}
                    xs={12}
                    className="col"
                    key={"col" + categoryIndex}
                  >
                    <Grid container direction="column">
                      <List>
                        {categoryObject.types.map((type, typeIdx) => (
                          <ListItem disablePadding key={type + typeIdx}>
                            <ListItemButton
                              component={Link}
                              to={`/search/${convertNameToUrl(type)}`}
                            >
                              <ListItemIcon>
                                <ListItemText
                                  sx={{ color: "text.primary" }}
                                  primary={removeCategorySuffix(
                                    type,
                                    categoryObject.name
                                  )}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                ))}
                <Grid item md={9} sm={12} xs={12}>
                  <CatSearchTable category={convertUrlToName(category)} />
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
