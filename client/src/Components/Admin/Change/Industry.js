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

export default function ChangeIndustry() {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [allIndustries, setAllIndustries] = useState([{ name: "test" }]);

  useEffect(() => {
    const getAllDevices = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/industries`);
        setAllIndustries(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getAllDevices();
  }, []);

  const handleChange = (_, newValue) => {
    setSelectedIndustry(newValue);
  };

  const handleSubmit = () => {
    console.log(selectedIndustry);
  };

  return (
    <Box>
      <Typography variant="h4">Change Industry</Typography>
      <FormGroup>
        <Autocomplete
          id="combo-box-demo"
          options={allIndustries}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} label="Industry Name" variant="outlined" />
          )}
        />
        <TextField label="Industry Description" />
        <Button variant="contained" onClick={handleSubmit}>
          Change Device
        </Button>
      </FormGroup>
    </Box>
  );
}