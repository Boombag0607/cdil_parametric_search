import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { BULL } from "../../utils/constants/components";

export default function Display() {
  const location = useLocation();
  const [allDevices, setAllDevices] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const { devices } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      const deviceResponse = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/devices/`
      );
      console.log("deviceResponse.data :: --- ", deviceResponse.data);
      setAllDevices(deviceResponse.data);

      const packageResponse = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/packages/`
      );
      // console.log(res.data);
      setAllPackages(packageResponse.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSelectedDevices(
      allDevices?.data?.filter((device) =>
        devices.includes(device.id.toLowerCase())
      )
    );
    // console.log("selected Devices in display: ", selectedDevices)
  }, [allDevices, devices]);

  return (
    <Grid container spacing={2}>
      <Typography variant="h4" component="h4">
        Your Selected Devices
      </Typography>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={15.5}>
          {selectedDevices.map((device) => (
            <Grid key={device.id} item>
              <Paper
                className="border"
                sx={{
                  width: 350,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {`Device: ${device.name + 1}`}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {device.id}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {device.package}
                    </Typography>
                    <Typography variant="body2">
                      {device.industry
                        .slice(1, -1)
                        .split(",")
                        .map((ind, indIndex, industryArray) => (
                          <span key={ind}>
                            {ind}
                            {indIndex === industryArray.length - 1 ? "" : BULL}
                          </span>
                        ))}
                      <br />
                      {allPackages
                        ?.filter((pkg) => pkg.id === device.package)
                        ?.map((p) => p.pkg_desc)}
                    </Typography>
                  </CardContent>
                  <CardActions className="p-2">
                    <Button href={`${device.pdf_link}`} size="small">
                      See Data Sheet
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}
