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

export default function Display() {
  const location = useLocation();
  const [allDevices, setAllDevices] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const { devices } = location.state || {};

  useEffect(() => {
    const fetchDevices = async () => {
      const res = await axios.get(`http://localhost:3000/devices/`);
      // console.log(res.data);
      setAllDevices(res.data);
    };
    const fetchPackages = async () => {
      const res = await axios.get(`http://localhost:3000/packages/`);
      // console.log(res.data);
      setAllPackages(res.data);
    };
    fetchDevices();
    fetchPackages();
  }, []);

  useEffect(() => {
    setSelectedDevices(
      allDevices.filter((device) => devices.includes(device.id.toLowerCase()))
    );
    // console.log("selected Devices in display: ", selectedDevices)
  }, [allDevices, devices]);

  return (
    <Grid className="p-3" sx={{ flexGrow: 1 }} container spacing={2}>
      <Typography className="m-3" variant="h3" component="h3">
        Your Selected Devices
      </Typography>
      <Grid className="mt-4" item xs={12}>
        <Grid container justifyContent="center" spacing={15.5}>
          {/* {devices.map((device) => ( */}
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
                      Device Details
                      <br />
                      {allPackages?.filter((pkg) => pkg.id === device.package)?.map((p) => p.pkg_desc)}
                    </Typography>
                  </CardContent>
                  <CardActions className="p-2">
                    <Button href={`${device.pdf_link}`} size="small">See Data Sheet</Button>
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
