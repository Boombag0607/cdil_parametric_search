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

export default function ChangeCategory() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allCategory, setAllCategories] = useState([{ name: "test" }]);

  useEffect(() => {
    const getAllDevices = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/categories`);
        setAllCategories(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getAllDevices();
  }, []);

  const handleChange = (_, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleSubmit = () => {
    console.log(selectedCategory);
    axios.post(`http://localhost:3000/categories`, {
      name: selectedCategory.name,
      description: selectedCategory.description,
    });
  };

  return (
    <Box>
      <Typography variant="h4">Change Category</Typography>
      <FormGroup>
        <Autocomplete
          id="combo-box-demo"
          options={allCategory}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} label="Device Category" variant="outlined" />
          )}
        />
        <TextField label="Category Description" />
        <Button variant="contained" onClick={handleSubmit}>
          Change Category
        </Button>
      </FormGroup>
    </Box>
  );
}
