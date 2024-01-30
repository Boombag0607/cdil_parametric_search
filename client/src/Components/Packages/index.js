import { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import axios from "axios";

export default function Packages() {
  const [allPackages, setAllPackages] = useState([]);
  useEffect(() => {
    const fetchPkgs = async () => {
      const pkgResponse = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/packages`
      );
      const packageData = await pkgResponse?.data;
      setAllPackages(packageData);
    };

    fetchPkgs();
  }, []);
  return (
    <Box>
      <Typography variant="h4" sx={{mb: 4}}>All Packages</Typography>
      <Grid container spacing={3} sx={{mb: 6}}>
        {allPackages?.map((pkg) => (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardMedia sx={{ height: 180 }} component="img" title="Device Package" image={pkg.image} alt={pkg.id} />
              <CardContent>
                <Typography variant="body1">{pkg.id}</Typography>
                <Typography variant="body1">{pkg.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
