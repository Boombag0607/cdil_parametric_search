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

export default function ChangeDevice() {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [allDevices, setAllDevices] = useState([{ name: "test" }]);

  useEffect(() => {
    const getAllDevices = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/devices`);
        setAllDevices(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getAllDevices();
  }, []);

  const handleChange = (_, newValue) => {
    setSelectedDevice(newValue);
  };

  const handleSubmit = () => {
    console.log(selectedDevice);
    axios.post(`http://localhost:3000/devices`, {
      name: selectedDevice.name,
      description: selectedDevice.description,
    });
  };

  return (
    <Box>
      <Typography variant="h4">Change Device</Typography>
      <FormGroup>
        <Autocomplete
          id="combo-box-demo"
          options={allDevices}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} label="Device Name" variant="outlined" />
          )}
        />
        <TextField label="Device Description" />
        <Button variant="contained" onClick={handleSubmit}>
          Change Device
        </Button>
      </FormGroup>
    </Box>
  );
}
