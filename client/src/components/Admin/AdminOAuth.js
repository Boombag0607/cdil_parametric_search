import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useLocation } from "react-router-dom";
import { getGoogleUrl } from "../../utils/getGoogleUrl";

const AdminLoginPage = () => {
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}
    >
      <Card
        sx={{
          width: "35%",
          border: "1px solid #ddd",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h6">
            Log in with your CDIL Google account:
          </Typography>
        </CardContent>
        <Button
          sx={{
            width: "100%",
            ":hover": { backgroundColor: "#2196f3", color: "white" },
          }}
          href={getGoogleUrl(from)}
        >
          <CardActions>
            <GoogleIcon fontSize="large" />
          </CardActions>
        </Button>
      </Card>
    </Container>
  );
};

export default AdminLoginPage;
