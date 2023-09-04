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

const industryList = [
  {
    value: "audio",
    label: "Audio",
  },
  {
    value: "automotive",
    label: "Automotive",
  },
  {
    value: "communications",
    label: "Communications",
  },
  {
    value: "computing",
    label: "Computing",
  },
  {
    value: "power",
    label: "Power",
  },
  {
    value: "sensing",
    label: "Sensing",
  },
];

export default function Search() {
  const [packages, setPackages] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [devices, setDevices] = useState([]);
  const [matchedDevice, setMatchedDevice] = useState("");
  const [currentDevice, setCurrentDevice] = useState("");

  useEffect(() => {
    const getPackages = () => {
      axios.get("http://localhost:3000/packages").then((response) => {
        setPackages(
          response.data.map((element) => {
            return { value: element.pkg_desc, label: element.ID };
          })
        );
      });
    };

    const getDevices = () => {
      axios.get("http://localhost:3000/devices").then((response) => {
        setDevices(
          response.data.map((element) => {
            return {
              value: element.ID.toLowerCase(),
              label: element.ID,
              package: element.package,
              industry: element.industry,
              status: element.status,
              pdf_link: element.pdf_link,
              data: element.data,
            };
          })
        );
      });
    };

    getDevices();
    getPackages();
    setIndustry(industryList);
  }, [industryList]);

  const SearchButton = () => (
    <IconButton onClick={handleInputDevice}>
      <SearchIcon />
    </IconButton>
  );

  const handleInputDevice = () => {
    setMatchedDevice(devices.find((element) => element.value === currentDevice.toLowerCase()));
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
        value={currentDevice}
        onChange={(e) => setCurrentDevice(e.target.value)}
        InputProps={{
          endAdornment: <SearchButton onClick={handleClickIndustry} />,
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
          defaultValue="industry"
          helperText="Search devices via industry"
        >
          {industry.map((option, index) => (
            <MenuItem key={option.value + index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormGroup>
      {currentDevice && matchedDevice ? (
        <Box>
          <Typography variant="body1" gutterBottom>
            {`Selected Device: ${matchedDevice.label},`}
            {`\nPackage: ${
              matchedDevice.package
            }`}
            {`\nIndustry: ${
              matchedDevice.industry
            }`}
            {
             matchedDevice.status === "active" ? (
              <Typography variant="body1" gutterBottom>
                {`\nStatus: ${matchedDevice.status}`}
              </Typography> 
              ) : (
              <Typography variant="body1" gutterBottom>
                {`\nStatus: ${matchedDevice.status}`}
              </Typography>
              )
            }
            {`\nPDF Link: ${
              matchedDevice.pdf_link
            }`}
            {`\nData: ${
              matchedDevice.data
            }`}

          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="body1" gutterBottom>
            No device found
          </Typography>
        </Box>
      )}
    </Box>
  );
}
