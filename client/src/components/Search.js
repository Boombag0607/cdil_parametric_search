import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  TextField,
  FormGroup,
  IconButton,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";

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
        alignItems: "center",
        ...sx,
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

  // useEffect(() => {
  //   const getPackages = async () => {
  //     const res = await axios.get(`http://localhost:3000/packages`);
  //     console.log("pkgs", res);
  //     setPackages(
  //       res.data.map((element) => {
  //         return {
  //           value: element.id.toLowerCase(),
  //           label: element.id,
  //           desc: element.pkg_desc,
  //         };
  //       })
  //     );
  //   };

  //   const getDeviceData = async (device) => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:3000/data/${encodeURIComponent(device.id)}`
  //       );
  //       console.log("data", res.data);
  //       return res?.data;
  //     } catch (err) {
  //       console.error(err);
  //       return null;
  //     }
  //   };

  //   const getDeviceCategory = async(subcat) => {
  //     const res = await axios.get(`http://localhost:3000/categories`);
  //     return res?.data?.filter(cat => cat.sub_cat.includes(subcat)).map(cat => cat.name);
  //   };

  //   const getDevices = async () => {
  //     const res = await axios.get(`http://localhost:3000/devices`);

  //     // Use Promise.all to fetch data for all devices concurrently
  //     const allDevicesObj = await Promise.all(
  //       res.data.map(async (element) => {
  //         const data = await getDeviceData(element);
  //         return {
  //           value: element.id.toLowerCase(),
  //           label: element.id,
  //           package: element.package,
  //           industry: element.industry,
  //           status: element.status,
  //           pdf_link: element.pdf_link,
  //           data: data, // Assign the fetched data
  //           subcategory: element.subcat_id,
  //           category: getDeviceCategory(element.subcat_id)
  //         };
  //       })
  //     );

  //     setDevices(allDevicesObj); // Set the devices with data
  //   };

  //   getDevices();
  //   getPackages();
  //   setIndustry(industryList);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packagesResponse = await axios.get(
          `http://localhost:3000/packages`
        );
        const packagesData = packagesResponse.data.map((element) => {
          return {
            value: element.id.toLowerCase(),
            label: element.id,
            desc: element.pkg_desc,
          };
        });

        const devicesResponse = await axios.get(
          `http://localhost:3000/devices`
        );
        const devicesData = devicesResponse.data;

        // Fetch data for all devices concurrently using Promise.all
        const allDevicesData = await Promise.all(
          devicesData.map(async (element) => {
            const dataResponse = await axios.get(
              `http://localhost:3000/data/${encodeURIComponent(element.id)}`
            );
            const deviceData = dataResponse.data;

            // Fetch category for the subcategory
            const categoryResponse = await axios.get(
              `http://localhost:3000/categories`
            );
            const subcategory = element.subcat_id;
            const categoryData = categoryResponse.data
              .filter((cat) => cat.sub_cat.includes(subcategory))
              .map((cat) => cat.name);

            return {
              value: element.id.toLowerCase(),
              label: element.id,
              package: element.package,
              industry: element.industry,
              status: element.status,
              pdf_link: element.pdf_link,
              data: deviceData,
              subcategory,
              category: categoryData,
            };
          })
        );

        // Set your state variables here
        setPackages(packagesData);
        setDevices(allDevicesData);
        setIndustry(industryList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
              onChange={(e) => setCurrentPackage(e.target.value)}
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
            "& > :not(style)": {},
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
              <StyledPaper className="h-100 w-50 text-center">
                {currentDevice && matchedDevice ? (
                  <Card className="h-100 text-center" sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 180 }}
                      image={matchedDevice.image}
                      title="Device Package"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {matchedDevice.category}
                      </Typography>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-100 text-center" sx={{ maxWidth: 345 }}>
                    <CardMedia sx={{ height: 90 }} title="No Device Selected" />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        No Device Selected
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </StyledPaper>
              <Box sx={{ alignItems: "center", height: "100%", m: 1 }}>
                <Item>Device: {matchedDevice.label}</Item>
                <Item>Package: {matchedDevice.package}</Item>
                <Item>Industry: {matchedDevice.industry}</Item>
                <Item>Status: {matchedDevice.status}</Item>
                <Item>PDF Link: {matchedDevice.pdf_link}</Item>
                <Item>Subcateorgy: {matchedDevice.subcategory}</Item>
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
