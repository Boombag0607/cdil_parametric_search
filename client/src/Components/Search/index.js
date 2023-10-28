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
  Button,
  Autocomplete,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchPageIcon from "../../utils/icons/SearchPageIcon";
import axios from "axios";
import { removeCategorySuffix } from "../../lib/name";

const StyledAutocomplete = styled(Autocomplete)({
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
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "100%",
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "grey.100"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
  alignItems: "center",
}));

export default function Search() {
  const [packages, setPackages] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [devices, setDevices] = useState([]);
  const [matchedDevices, setMatchedDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(["Active"]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packagesResponse = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/packages`
        );
        const allPackageData = packagesResponse.data.map((element) => {
          return {
            value: element.id.toLowerCase(),
            label: element.id,
            desc: element.pkg_desc,
          };
        });

        const industryResponse = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/industries`
        );
        const industryList = industryResponse.data.map((element) => {
          return {
            value: element.id.toLowerCase(),
            label: element.id,
          };
        });

        const devicesResponse = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/devices`
        );
        const devicesData = devicesResponse.data;
        console.log("devicesdata :: ", devicesData);

        const allDevicesData = await Promise.all(
          devicesData.data.map(async (element) => {
            const dataResponse = await axios.get(
              `${
                process.env.REACT_APP_ENDPOINT_USER_PREFIX
              }/data/${encodeURIComponent(element.id)}`
            );
            const deviceData = dataResponse.data;
            const categoryResponse = await axios.get(
              `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/categories`
            );
            const subcategory = await element.subcat_id;
            const categoryData = categoryResponse.data
              .filter((cat) => cat.sub_cat.types.includes(subcategory))
              .map((cat) => cat.name);

            const industry =
              (await element.industry) !== null
                ? element.industry.slice(1, -1).split(",")
                : [];

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

        setPackages(allPackageData);
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
    setSelectedDevices(newValue);
  };

  const handlePackageChange = (event, newValue) => {
    setLoading(true);
    setSelectedPackages(newValue);
    handleInputs();
  };

  const handleIndustryChange = (event, newValue) => {
    setLoading(true);
    setSelectedIndustries(newValue);
    handleInputs();
  };

  const handleStatusChange = (event, newValue) => {
    setLoading(true);
    setSelectedStatus(newValue);
    handleInputs();
  };

  const handleInputs = useCallback(() => {
    let filteredDevices = devices;

    if (selectedDevices.length > 0) {
      filteredDevices = filteredDevices.filter((element) =>
        selectedDevices.some((device) => device.label === element.label)
      );
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
    }

    if (selectedIndustries.length > 0) {
      filteredDevices = filteredDevices.filter((element) =>
        selectedIndustries.some((industry) =>
          element.industry.includes(industry.label)
        )
      );
    }

    if (selectedStatus.length > 0) {
      filteredDevices = filteredDevices.filter((element) =>
        selectedStatus.some((status) => status === element.status)
      );
    }

    setMatchedDevices(filteredDevices);
  }, [
    selectedDevices,
    selectedPackages,
    selectedIndustries,
    selectedStatus,
    devices,
  ]);

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
        width: "100%",
        minHeight: "65vh",
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ display: "flex", mb: 4, alignItems: "center" }}>
        <SearchPageIcon />
        <Typography variant="h4" sx={{ px: 1 }}>
          Search Your Product Here
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            "& > :not(style)": { mb: 2 },
          }}
        >
          <FormGroup>
            <StyledAutocomplete
              multiple
              id="controllable-states-demo"
              options={devices}
              value={selectedDevices}
              onChange={handleDeviceChange}
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
          <FormGroup>
            <StyledAutocomplete
              multiple
              id="tags-outlined"
              options={["Active", "Inactive"]}
              defaultValue={[]}
              filterSelectedOptions
              value={selectedStatus}
              onChange={handleStatusChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  placeholder="Select device status"
                />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {loading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            <Box sx={{ maxHeight: "35vh", overflowY: "scroll" }}>
              {matchedDevices.length === 0 ? (
                <StyledPaper>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" fontSize="1rem" component="div">
                      No Device with applied filters found
                    </Typography>
                  </Box>
                </StyledPaper>
              ) : (
                matchedDevices.map((md, index) => (
                  <Grid container>
                    <Grid item xs={6}>
                      <Card sx={{ border: "1px solid #bbb" }}>
                        <CardMedia
                          sx={{ height: 180 }}
                          component="img"
                          image={md.image}
                          title="Device Package"
                        />
                        <CardContent>
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body.1" fontWeight={500}>
                              {removeCategorySuffix(
                                md.subcategory,
                                md.category
                              ) +
                                " " +
                                md.category}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <List dense={true} sx={{}}>
                        <ListItem>
                          <ListItemText
                            primary={`Device: ${md.label}`}
                          ></ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={`Package: ${md.package}`}
                          ></ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={`Industry: ${md.industry.join(", ")}`}
                          ></ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={`Status: ${md.status}`}
                          ></ListItemText>
                        </ListItem>
                        <ListItem>
                          <Button href={`${md.pdf_link}`}>
                            See Data Sheet
                          </Button>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                ))
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
