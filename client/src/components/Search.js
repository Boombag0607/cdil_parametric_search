import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  FormGroup,
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
import axios from "axios";

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
  const [matchedDevices, setMatchedDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [loading, setLoading] = useState(false);

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

        const industryResponse = await axios.get(
          `http://localhost:3000/industries`
        );
        const industryList = industryResponse.data.map((element) => {
          return {
            value: element.id.toLowerCase(),
            label: element.id,
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
            const subcategory = await element.subcat_id;
            const categoryData = categoryResponse.data
              .filter((cat) => cat.sub_cat.includes(subcategory))
              .map((cat) => cat.name);

            const industry = await element.industry!==null ? element.industry.slice(1, -1).split(",") : [];

            // console.log("industry: ", element.industry.slice(1, -1));
            return {
              value: element.id.toLowerCase(),
              label: element.id,
              package: element.package,
              industry: industry,
              status: element.status,
              pdf_link: element.pdf_link,
              data: deviceData,
              subcategory,
              category: categoryData,
            };
          })
        );

        setPackages(packagesData);
        setDevices(allDevicesData);
        setMatchedDevices(allDevicesData);
        setIndustry(industryList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDeviceChange = (event, newValue) => {
    setLoading(true);
    console.log("inside: handleDeviceChange newValue ::: ", newValue);
    // Use the state updater function to update selectedDevices
    setSelectedDevices(newValue);
  };

  const handlePackageChange = (event, newValue) => {
    setLoading(true);
    setSelectedPackages(newValue);
    console.log(
      "inside: handlePackageChange selected packages ::: ",
      selectedPackages
    );
    handleInputs();
  };

  const handleIndustryChange = (event, newValue) => {
    setLoading(true);
    setSelectedIndustries(newValue);
    console.log(
      "inside: handleIndustryChange selected industries ::: ",
      selectedIndustries
    );
    handleInputs();
  };

  const handleInputs = useCallback(() => {
    let filteredDevices = devices;

    if (selectedDevices.length > 0) {
      filteredDevices = filteredDevices.filter((element) =>
        selectedDevices.some((device) => device.label === element.label)
      );
      console.log("filteredDevices after device ::: ", filteredDevices);
    }

    if (selectedPackages.length > 0) {
      console.log(
        "inside handleInputs selectedPackages ::: ",
        selectedPackages
      );
      filteredDevices = filteredDevices.filter((element) =>
        selectedPackages.some(
          (selectedPackage) => selectedPackage.label === element.package
        )
      );
      console.log("filteredDevices after package ::: ", filteredDevices);
    }

    if (selectedIndustries.length > 0) {
      filteredDevices = filteredDevices.filter((element) =>
        selectedIndustries.some((industry) =>
          element.industry.includes(industry.label)
        )
      );
      console.log("filteredDevices after industry ::: ", filteredDevices);
    }

    // console.log("inside handleInputs filteredDevices ::: ", filteredDevices);
    setMatchedDevices(filteredDevices);
  }, [selectedDevices, selectedPackages, selectedIndustries, devices]);

  useEffect(() => {
    console.log(
      "inside: handleDeviceChange selected Devices ::: ",
      selectedDevices
    );
    handleInputs();
    setLoading(false);
  }, [selectedDevices, selectedPackages, selectedIndustries, handleInputs]);

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
            <StyledAutocomplete
              multiple
              id="controllable-states-demo"
              options={devices}
              value={selectedDevices}
              onChange={handleDeviceChange}
              // inputValue={inputDevice}
              // onInputChange={handleDeviceInputChange}
              renderInput={(params) => <TextField {...params} label="Device" />}
            />
          </FormGroup>
          <FormGroup>
            <StyledAutocomplete
              multiple
              id="tags-outlined"
              options={packages}
              defaultValue={[]}
              filterSelectedOptions
              value={selectedPackages}
              onChange={handlePackageChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Packges"
                  placeholder="Select packages for filtering"
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <StyledAutocomplete
              multiple
              id="tags-outlined"
              options={industry}
              defaultValue={[]}
              filterSelectedOptions
              value={selectedIndustries}
              onChange={handleIndustryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Industry"
                  placeholder="Select industry for filtering"
                />
              )}
            />
          </FormGroup>

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
                      <Item>Industry: {md.industry.join(", ")}</Item>
                      <Item>Status: {md.status}</Item>
                      <Item>Subcateorgy: {md.subcategory}</Item>
                      <Button href={`${md.pdf_link}`}>See Data Sheet</Button>
                    </Box>
                  </Item>
                ))
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
