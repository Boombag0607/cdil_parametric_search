import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  TextField,
  FormGroup,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

// const currencies = [
//   {
//     value: "USD",
//     label: "$",
//   },

export default function Search() {
  const [packages, setPackages] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [devices, setDevices] = useState([]);
  const [currentDevice, setCurrentDevice] = useState('');

  useEffect(() => {
    const getPackages = () => {
      axios
        .get("http://localhost:3000/packages")
        .then((response) => response.json())
        .then((data) => {
          setPackages(
            data.map((element) => {
              return { value: element.pkg_desc, label: element.ID };
            })
          );
        });
    };

    const getDevices = () => {
      axios
        .get("http://localhost:3000/devices")
        .then((response) => response.json())
        .then((data) => {
          setDevices(
            data.map((element) => {
              return { value: element.pkg_desc, label: element.ID };
            })
          );
        });
    };
    
    getDevices();
    getPackages();
  }, []);

  const SearchButton = () => (
    <IconButton onClick={handleInputDevice}>
      <SearchIcon />
    </IconButton>
  );

  const handleInputDevice = () => {
    console.log(devices.find((element) => element.value === currentDevice.toUpperCase()));
    console.log(currentDevice);
    // Perform other actions with inputValue if needed
  };

  const handleClickPackages = () => {
    console.log("clicked");
  };

  const handleClickIndustry = () => {
    console.log("clicked");
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 2, width: "100ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h3" component="h2">
        Search Your Product Here
      </Typography>
      <TextField
        id="outlined-basic"
        label="Device"
        variant="outlined"
        value = {currentDevice}
        onChange={(e) => setCurrentDevice(e.target.value)}
        InputProps={{
          endAdornment: <SearchButton />,
        }}
      />
      {/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}

      {console.log(devices)}
      <FormGroup>
        <TextField
          id="outlined-select-currency"
          select
          label="Package"
          defaultValue="EUR"
          helperText="Search devices via package"
        >
          {packages.map((option, index) => (
            <MenuItem key={option.value + index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormGroup>
      <FormGroup>
        <TextField
          id="outlined-select-currency"
          select
          label="Industry"
          defaultValue="EUR"
          helperText="Search devices via industry"
        >
          {packages.map((option, index) => (
            <MenuItem key={option.value + index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormGroup>
    </Box>
  );
}
