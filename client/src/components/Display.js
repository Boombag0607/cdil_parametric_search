import * as React from "react";
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

export default function SpacingGrid(props) {
  const { devices } = props;

  return (
    <Grid className="p-3" sx={{ flexGrow: 1 }} container spacing={2}>
        <Typography className="m-3" variant="h3" component="h3">
            Your Selected Devices
        </Typography>
      <Grid className="mt-4" item xs={12}>
        <Grid container justifyContent="center" spacing={15.5}>
          {/* {devices.map((device) => ( */}
          {[0, 1,2,3,4].map((device) => (
            <Grid key={device} item>
              <Paper
                className="border"
                sx={{
                  width: 350,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <Card >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {`Device: ${device+1}`}
                    </Typography>
                    <Typography variant="h5" component="div">
                      Device Name
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      some detail
                    </Typography>
                    <Typography variant="body2">
                      Device Details
                      <br />
                      {'"Quoted Device Details"'}
                    </Typography>
                  </CardContent>
                  <CardActions className="p-2">
                    <Button size="small">See Data Sheet</Button>
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
