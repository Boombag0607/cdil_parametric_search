import { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import axios from "axios";

export default function Packages() {
  const [allPackages, setAllPackages] = useState([]);
  useEffect(() => {
    const fetchPkgs = async () => {
      const pkgResponse = await axios.get(
        `${process.env.REACT_APP_ENPOINT_USER_PREFIX}/packages}`
      );
      const packagedata = await pkgResponse.data;
      setAllPackages(packagedata);
    };

    fetchPkgs();
  }, []);
  return (
    <Box>
      <Typography variant="h4">All Packages</Typography>
      <Grid container>
        {allPackages.map((pkg) => (
          <Grid item>
            <img src={pkg.image} alt={pkg.name} />
            <Typography variant="h5">{pkg.name}</Typography>
            <Typography variant="body1">{pkg.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
