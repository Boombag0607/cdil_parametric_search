import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormGroup,
  IconButton,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Tooltip,
  Button,
  Autocomplete,
  LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

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

// const inputDeviceColumns = [
//   { field: "id", headerName: "Selected Device", width: 90 },
//   {
//     field: "package",
//     headerName: "Package",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "industry",
//     headerName: "Industry",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     type: "boolean",
//     width: 110,
//     editable: true,
//   },
//   {
//     field: "pdf_link",
//     headerName: "PDF Link",
//     description: "This column is of type URL",
//     sortable: false,
//     width: 160,
//     // valueGetter: (params) =>
//     //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
// ];

function StyledAutocomplete(props) {
  const { sx, ...other } = props;
  return (
    <Autocomplete
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          },
          "&:hover fieldset": {
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          },
          "&.Mui-focused fieldset": {
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          },
        },
        ...sx,
      }}
      {...other}
    />
  );
}

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
  const [matchedDevices, setMatchedDevices] = useState([
    {
      value: "",
      label: "",
      package: "",
      industry: "",
      status: "",
      pdf_link: "",
      data: [],
      subcategory: "",
      category: "",
    },
  ]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [inputDevice, setInputDevice] = useState("");
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // const handleInputDevice = () => {
  //   setMatchedDevices(
  //     devices.find((element) => element.value === currentDevices.toLowerCase())
  //   );
  //   // Perform other actions with inputValue if needed
  // };

  const handleDeviceChange = (event, newValue) => {
    setSelectedDevices(newValue);
    handleInputs();
  };

  const handleInputChange = (event, newInputValue) => {
    setInputDevice(newInputValue);
    const selectedDevice = devices.find(
      (device) => device.label === inputDevice
    );
    console.log("selectedDevices ::: ", selectedDevices);

    if (selectedDevice) {
      // Append the selected device object to the selectedDevices array
      setSelectedDevices([...selectedDevices, selectedDevice]);
    }
    // setSelectedDevices([...selectedDevices, newInputValue]);
  };

  const handleInputs = () => {
    if (
      selectedDevices.length === 0 &&
      selectedPackages.length === 0 &&
      selectedIndustries.length === 0
    ) {
      // No filters are applied, show all devices
      setMatchedDevices(devices);
    } else {
      // Apply filters based on user selections
      const filteredDevices = devices.filter((element) => {
        return (
          (selectedDevices.length === 0 ||
            selectedDevices.includes(element.label)) &&
          (selectedPackages.length === 0 ||
            selectedPackages.includes(element.package)) &&
          (selectedIndustries.length === 0 ||
            selectedIndustries.includes(element.industry))
        );
      });
      setMatchedDevices(filteredDevices);
      console.log("filteredDevices: ", filteredDevices);
    }
    setLoading(false);
  };

  // const SearchButton = () => (
  //   <IconButton onClick={handleInputs}>
  //     <SearchIcon />
  //   </IconButton>
  // );

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 3 },
        width: "100%",
      }}
      noValidate
      autoComplete="off"
    >
      {/* {console.log("packages: ", packages)} */}
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
          <FormGroup>
            {/* <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Device"
              variant="outlined"
              value = {currentDevice}
              onChange={(event, newDevice) => {
                setLoading(true);
                setCurrentDevice(event.target.value || newDevice);
                handleInputs();
              }}
              InputProps={{
                endAdornment: <SearchButton />,
              }}
            /> */}
            <StyledAutocomplete
              multiple
              id="controllable-states-demo"
              options={devices}
              value={selectedDevices}
              onChange={handleDeviceChange}
              inputValue={inputDevice}
              onInputChange={handleInputChange}
              renderInput={(params) => <TextField {...params} label="Device" />}
            />
          </FormGroup>
          {/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}
          <div>{`value: ${
            selectedDevices.length !== 0
              ? `'${selectedDevices.map((d) => d.label)}'`
              : "null"
          }`}</div>
          <div>{`inputValue: '${inputDevice}'`}</div>
          <FormGroup>
            <StyledAutocomplete
              multiple
              id="tags-outlined"
              options={packages}
              // getOptionLabel={(option) => option.label}
              defaultValue={[]}
              filterSelectedOptions
              inputValue={selectedPackages}
              onInputChange={(event, newInputValue) => {
                console.log("newIpValue:   ", newInputValue);
                setSelectedPackages(newInputValue);
                handleInputs();
              }}
              // onChange={(event, newValue) => setSelectedPackages(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Packges"
                  placeholder="Select packages for filtering"
                />
              )}
            />
          </FormGroup>
          {/* <TextField/> */}
          {/* <FormGroup sx={{ width: "100%" }}>
            <TextField
              id="select-package"
              select
              label="Package"
              helperText="Search devices via package"
              value={currentPackage} // Make sure to set the value prop
              onChange={(e) => {
                setCurrentPackage(e.target.value);
                handleInputs();
              }}
            >
              <MenuItem key="clear" value="clear">
                Clear selection
              </MenuItem>
              {packages.map((option, index) => (
                <MenuItem key={option.value + index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormGroup> */}
          <FormGroup>
            <StyledAutocomplete
              multiple
              id="tags-outlined"
              options={industry}
              // getOptionLabel={(option) => option.label}
              defaultValue={[]}
              filterSelectedOptions
              onChange={(e) => {
                setSelectedIndustries(e.target.value);
                handleInputs();
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Industry"
                  placeholder="Select industry for filtering"
                />
              )}
            />
          </FormGroup>
          {/* </Item> */}
          <Tooltip title="Add Filters" enterDelay={500} leaveDelay={200}>
            <Button onClick={handleInputs}>Apply Filters</Button>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            "& > :not(style)": {},
          }}
        >
          {loading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            <Box
              sx={{
                p: 1,
                alignItems: "center",
                bgcolor: "background.paper",
                overflowY: "scroll",
                maxHeight: "80vh",
              }}
            >
              {matchedDevices.length === 0 ? (
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
                  <StyledPaper className="h-100 text-center">
                    <Card className="h-100 text-center">
                      <CardMedia component="img" title="Device Package" />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          No Device with applied filters found...
                        </Typography>
                      </CardContent>
                    </Card>
                  </StyledPaper>
                </Item>
              ) : (
                matchedDevices.map((md, index) => (
                  <Item
                    key={md.label + index}
                    sx={{
                      width: "80%",
                      height: 260,
                      display: "flex",
                      alignItems: "flex-start",
                      border: "1px solid",
                      borderRadius: 1.5,
                      m: 1,
                      borderColor: (theme) =>
                        theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                    }}
                  >
                    <StyledPaper className="h-100 w-50 text-center">
                      {md ? (
                        <Card className="h-100 text-center">
                          <CardMedia
                            sx={{ height: 180 }}
                            component="img"
                            image={md.image}
                            title="Device Package"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="body1"
                              component="div"
                              fontWeight={700}
                              fontSize={20}
                            >
                              {md.category}
                            </Typography>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="h-100 text-center">
                          <CardMedia
                            sx={{ height: 90 }}
                            component="img"
                            title="No Device Selected"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="body1"
                              component="div"
                            >
                              No Device Selected
                            </Typography>
                          </CardContent>
                        </Card>
                      )}
                    </StyledPaper>
                    <Box sx={{ alignItems: "center", height: "100%", m: 1 }}>
                      <Item>Device: {md.label}</Item>
                      <Item>Package: {md.package}</Item>
                      <Item>Industry: {md.industry}</Item>
                      <Item>Status: {md.status}</Item>
                      <Item>Subcateorgy: {md.subcategory}</Item>
                      <Button href={`${md.pdf_link}`}>See Data Sheet</Button>
                    </Box>
                  </Item>
                ))
              )}
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
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
