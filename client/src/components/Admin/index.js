import React, { useState } from "react";
import AddDevice from "./Add/Device";
import AddCategory from "./Add/Category";
import AddPackage from "./Add/Package";
import AddIndustry from "./Add/Industry";
import ChangeDevice from "./Change/Device";
import ChangeCategory from "./Change/Category";
import ChangePackage from "./Change/Package";
import ChangeIndustry from "./Change/Industry";
import AdminLoginPage from "./AdminOAuth";

import axios from "axios";
import {
  Autocomplete,
  Box,
  FormGroup,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const OPTIONS = [
  {
    label: "Category",
    value: "category",
  },
  {
    label: "Device",
    value: "device",
  },
  {
    label: "Package",
    value: "package",
  },
  {
    label: "Industry",
    value: "industry",
  },
];

function AddOrChange(props) {
  const { type } = props;
  const [add, setAdd] = useState(false);
  const [change, setChange] = useState(false);

  const handleClickAdd = (event) => {
    console.log("Add");
    setAdd(true);
    setChange(false);
  };

  const handleClickChange = (event) => {
    console.log("Change");
    setChange(true);
    setAdd(false);
  };

  return (
    <Grid container sx={{ m: 3 }}>
      {add || change ? (
        <Grid item>
          {add ? (
            <Box>
              {type === "device" ? (
                <AddDevice />
              ) : type === "category" ? (
                <AddCategory />
              ) : type === "package" ? (
                <AddPackage />
              ) : type === "industry" ? (
                <AddIndustry />
              ) : null}
            </Box>
          ) : (
            <Box>
              {type === "device" ? (
                <ChangeDevice />
              ) : type === "category" ? (
                <ChangeCategory />
              ) : type === "package" ? (
                <ChangePackage />
              ) : type === "industry" ? (
                <ChangeIndustry />
              ) : null}
            </Box>
          )}
        </Grid>
      ) : (
        <Box>
          <Button variant="contained" onClick={handleClickAdd}>
            Add
          </Button>
          <Button disabled>OR</Button>
          <Button variant="contained" onClick={handleClickChange}>
            Change
          </Button>
          <Button disabled>?</Button>
        </Box>
      )}
    </Grid>
  );
}

function AdminComponent() {
  const [isAdminAuthorised, setIsAdminAuthorised] = useState(true);

  const [selectedType, setSelectedType] = useState();

  const checkAdminAuthorization = async () => {
    try {
      const response = await axios.get("/admin");
      if (response.status === 200) {
        setIsAdminAuthorised(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //   useEffect(() => checkAdminAuthorization(), []);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setSelectedType(newValue);
  };

  return (
    <Box sx={{ m: 4, p: 1 }}>
      <Typography variant="h2" component="h2">
        Admin DashBoard
      </Typography>
      <Grid container spacing={2}>
        {isAdminAuthorised ? (
          <Box sx={{ m: 4 }}>
            <Grid item>
              <FormGroup>
                <Autocomplete
                  id="admin-choices"
                  options={OPTIONS}
                  value={selectedType}
                  onChange={handleChange}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a type to add or change"
                    />
                  )}
                />
              </FormGroup>
            </Grid>
            <Grid item>
              {selectedType !== undefined || null ? (
                <AddOrChange type={selectedType?.value} />
              ) : null}
            </Grid>
          </Box>
        ) : (
          <AdminLoginPage />
        )}
      </Grid>
    </Box>
  );
}

export default AdminComponent;
