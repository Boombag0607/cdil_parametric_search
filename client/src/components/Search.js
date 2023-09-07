import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  MenuItem,
  TextField,
  FormGroup,
  IconButton,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

// const currencies = [
//   {
//     value: "USD",
//     label: "$",
//   },

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   flexGrow: 1,
// }));

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

const inputDeviceColumns = [
  { field: "id", headerName: "Selected Device", width: 90 },
  {
    field: "package",
    headerName: "Package",
    width: 150,
    editable: true,
  },
  {
    field: "industry",
    headerName: "Industry",
    width: 150,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    type: "boolean",
    width: 110,
    editable: true,
  },
  {
    field: "pdf_link",
    headerName: "PDF Link",
    description: "This column is of type URL",
    sortable: false,
    width: 160,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

function StyledPaper(props) {
  const { sx, ...other } = props;
  return (
    <Paper
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        alignItems:"center",
        ...sx
      }}
      {...other}
    />
  );
}

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 0.5,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        fontSize: "0.875rem",
        fontWeight: "600",
        ...sx,
      }}
      {...other}
    />
  );
}

export default function Search() {
  const [packages, setPackages] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [devices, setDevices] = useState([]);
  const [matchedDevice, setMatchedDevice] = useState("");
  const [currentDevice, setCurrentDevice] = useState("");
  const [currentPackage, setCurrentPackage] = useState("");
  const [matchedDeviceRows, setMatchedDeviceRows] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      const res = await axios.get(`http://localhost:3000/packages`);
      console.log("pkgs", res);
      setPackages(
        res.data.map((element) => {
          return {
            value: element.id.toLowerCase(),
            label: element.id,
            desc: element.pkg_desc,
          };
        })
      );
    };

    const getDeviceData = async (device) => {
      try {
        const res = await axios.get(
          `http://localhost:3000/data/${encodeURIComponent(device.id)}`
        );
        console.log("data", res.data);
        return res?.data;
      } catch (err) {
        console.error(err);
        return null;
      }
    };

    const getDevices = async () => {
      const res = await axios.get(`http://localhost:3000/devices`);

      // Use Promise.all to fetch data for all devices concurrently
      const devicesWithData = await Promise.all(
        res.data.map(async (element) => {
          const data = await getDeviceData(element);
          return {
            value: element.id.toLowerCase(),
            label: element.id,
            package: element.package,
            industry: element.industry,
            status: element.status,
            pdf_link: element.pdf_link,
            data: data, // Assign the fetched data
          };
        })
      );

      setDevices(devicesWithData); // Set the devices with data
    };

    getDevices();
    getPackages();
    setIndustry(industryList);
  }, []);

  const handleInputDevice = () => {
    setMatchedDevice(
      devices.find((element) => element.value === currentDevice.toLowerCase())
    );
    // Perform other actions with inputValue if needed
  };

  const SearchButton = () => (
    <IconButton onClick={handleInputDevice}>
      <SearchIcon />
    </IconButton>
  );

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 3 },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h3" component="h2">
        Search Your Product Here
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          sx={{
            "& > :not(style)": { m: 2 },
          }}
        >
          {/* <Item> */}
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Device"
            variant="outlined"
            value={currentDevice}
            onChange={(e) => setCurrentDevice(e.target.value)}
            InputProps={{
              endAdornment: <SearchButton />,
            }}
          />
          {/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}

          {console.log(devices)}
          <FormGroup sx={{ width: "100%" }}>
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
          <FormGroup sx={{ width: "100%" }}>
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
          {/* </Item> */}
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            "& > :not(style)": {  },
          }}
        >
          <Box
            sx={{
              p: 1,
              alignItems: "center",
              bgcolor: "background.paper",
            }}
          >
            <Item
              sx={{
                width: "80%",
                height: 260,
                display: "flex",
                alignItems: "flex-start",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.800" : "grey.300",
              }}
            >
              <StyledPaper className="h-100 w-50 text-center" > {
                currentDevice && matchedDevice ? (
                  <img src={`${matchedDevice.image}`} alt={matchedDevice.label}/>
                ): (
                  <Typography >No Device Selected</Typography>
                )
              }</StyledPaper>
              <Box sx={{ alignItems: "center", height: "100%", m: 1 }}>
                <Item>Device: {matchedDevice.label}</Item>
                <Item>Package: {matchedDevice.package}</Item>
                <Item>Industry: {matchedDevice.industry}</Item>
                <Item>Status: {matchedDevice.status}</Item>
                <Item>PDF Link: {matchedDevice.pdf_link}</Item>
                <Item>Subcateorgy: {matchedDevice.pdf_link}</Item>
                <Item>Category: {matchedDevice.pdf_link}</Item>
              </Box>
            </Item>
            {/* <DataGrid
                rows={matchedDeviceRows}
                columns={inputDeviceColumns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              /> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
