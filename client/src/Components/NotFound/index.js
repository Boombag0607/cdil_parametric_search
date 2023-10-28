import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { NotFoundImage } from "../../utils/constants/components";

export default function NotFound() {
  return (
    <Box
      className="not-found"
      sx={{ display: "flex", justifyContent: "center", minHeight: "60vh" }}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ height: "100%", display: "flex", justifyContent: "center" }}
          >
            <NotFoundImage />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h4">
              Uh oh! this page could not be found
            </Typography>
            <Box sx={{ my: 3 }}>
              <Button href="/" variant="contained">
                Go to Home
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
