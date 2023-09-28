import { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function ChangePackage() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [allPackages, setAllPackages] = useState([{ name: "test" }]);

  useEffect(() => {
    const getAllDevices = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/packages`);
        setAllPackages(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getAllDevices();
  }, []);

  const handleChange = (_, newValue) => {
    setSelectedPackage(newValue);
  };

  const handleSubmit = () => {
    axios.post(`http://localhost:3000/packages`, {
      headers: {
        contentType: "application/json",
      },
    });
  };

  return (
    <Box>
      <Typography variant="h4">Change Package</Typography>
      <FormGroup>
        <Autocomplete
          id="combo-box-demo"
          options={allPackages}
          getOptionLabel={(option) => option.name}
          value={selectedPackage}
          style={{ width: 300 }}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} label="Package Name" variant="outlined" />
          )}
        />
        <TextField label="Package Description" />
        <Button variant="contained" onClick={handleSubmit}>
          Change Device
        </Button>
      </FormGroup>
    </Box>
  );
}
