import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { footer, links } from "../../utils/constants/data";

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
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {footer.aboutUs}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {footer.contactUs.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {footer.contactUs.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: {footer.contactUs.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Link
                href={links.developerContact}
                underline="hover"
                color="inherit"
              >
                Contact the Developer
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Assurance of Quality
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {footer.qualityAssurance}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
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
