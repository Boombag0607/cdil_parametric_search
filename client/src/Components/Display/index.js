import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
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
import NotFound from '../NotFound';

export default function Display() {
  const location = useLocation();
  const [allDevices, setAllDevices] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [receivedFlag, setReceivedFlag] = useState(false);
  const { devices } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      const deviceResponse = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/devices/`
      );
      setAllDevices(deviceResponse?.data);

      const packageResponse = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/packages/`
      );
      setAllPackages(packageResponse?.data);  
    };

    fetchData();
  }, [allDevices, devices]);

  useEffect(() => {
    const setDisplayVariables = async () => {
      if (!devices || devices.length===0) {
        setReceivedFlag(false);
      } else {
        setSelectedDevices(
          allDevices?.filter((device) =>
            devices.includes(device.id.toLowerCase())
          )
        );
        setReceivedFlag(true);
      }
    }
    
    setDisplayVariables();
  }, [allDevices, devices]);

  return (
    <Box>
      <Box sx={{ display: "flex", mb: 4 }}>
        <Typography variant="h4" >
          Your Selected Devices
        </Typography>
      </Box>
      <Box item xs={12} sx={{minHeight: "50vh"}}>
        {
          !receivedFlag 
          ? 
          (<Box>
            <NotFound text={`Please Select Devices from Subcategory tables`}/>
          </Box>)
         : ( 
        
        <Grid container justifyContent="center" sx={{mb: 6}} spacing={2}>
          {selectedDevices?.map((device) => (
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
                      {`Type: ${device.subcat_id}`}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {device.id}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {device.package}
                    </Typography>
                    <Typography variant="body2">
                      {device?.industry
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
        </Grid> )}
      </Box>
      
    </Box>
  );
}
