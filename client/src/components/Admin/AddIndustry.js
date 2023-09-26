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

export default function AddDevice() {
  const [subCat, setSubCat] = useState("");
  const [dataHeaders, setDataHeaders] = useState([]);
  const [allDevices, setAllDevices] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    subCat: "",
    name: "",
    packaging: "",
    industry: "",
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/admin/subcat_header", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        // Request was successful
        console.log("Data successfully added to device_params table");
      } else {
        // Handle error responses here
        const data = await response.json();
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (_, newValue) => {
    setSubCat(newValue);
  };

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

  useEffect(() => {
    const getSubCatHeaders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/headers/${subCat}`
        );
        const filteredSubCat = response.data.filter(
          (subCat) => subCat.name === subCat
        );
        setSubCat(filteredSubCat);
      } catch (err) {
        console.error(err.message);
      }
    };

    const getAllSubCats = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/devices`);
        const subCatArray = response.data.map((subCat) => subCat.name);
        setSubCat(subCatArray);
      } catch (err) {
        console.error(err.message);
      }
    };

    getSubCatHeaders();
    getAllSubCats();
  }, [subCat]);

  return (
    <Box>
      <Typography variant="h4">Add Industry</Typography>
      <FormGroup>
        {/* <TextField label="Device Name" />
                <TextField label="Device Description" />
                <TextField label="Device Image" />
                <TextField label="Device Price" />
                <TextField label="Device Category" />
                <TextField label="Device Sub Category" />
                <TextField label="Device Status" />
                <TextField label="Device Industry" />
                <TextField label="Device Package" /> */}
        <TextField
          value={subCat}
          onChange={handleChange}
          label="Enter Device"
        />
      </FormGroup>
      <Button onClick={handleSubmit}>Add Indsutry</Button>
    </Box>
  );
}