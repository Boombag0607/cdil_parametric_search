import { Box, Container, Grid, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
        width: "100%",
      }}
    >
      <Container>
        <Grid sx={{ width: "100%" }} container spacing={6}>
          {" "}
          {/* Adjust the spacing for different screen sizes */}
          <Grid item xs={12} sm={6} md={4}>
            {" "}
            {/* Use different column widths for different screen sizes */}
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Continental Device India Pvt. Ltd., (CDIL) is a pioneer and a
              world class Semiconductor Manufacturer of silicon chips and
              devices since 1964.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {" "}
            {/* Use different column widths for different screen sizes */}
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              C-120 Naraina Industrial Area -I, New Delhi - 110028
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: email@cdil.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: (+91) 11 4141 1112, (+91) 11 2579 6150
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact the{" "}
              <Link
                href="https://www.linkedin.com/in/ananya-gautam-7342b4201/"
                color="inherit"
              >
                Developer
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Assurance of Quality
            </Typography>
            <Typography variant="body2" color="text.secondary">
              CDIL is an ISO 9001, IATF 16949, ISO 14001 certified company
              following strict quality standards for manufacturing of its
              products.
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
          {" "}
          {/* Adjust margin and alignment for different screen sizes */}
          <Typography variant="body2" color="text.secondary">
            {"Copyright © "}
            <Link color="inherit" href="https://cdil.com/">
              CDIL
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
