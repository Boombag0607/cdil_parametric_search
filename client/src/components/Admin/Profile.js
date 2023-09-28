import { Avatar, Box, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";

const UserAvatar = styled(Avatar)({
  height: "200px",
  width: "200px",
});

function stringToColor(string) {
  if (!string) return "#000";
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: "75px"
    },
    children: name ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : "",
  };
}

export default function AdminProfile() {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user`);
        setUser(response.data);
      } catch (err) {
        console.error(err.message);
      }
      setUser({
        name: "Ananya Gautam",
        email: "ananyagautam0607@gmail.com",
        role: "ADMIN",
        image: "",
      });
    };

    getUser();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
      }}
    >
      <CardMedia>
        {user?.image ? (
          <UserAvatar alt={user?.name} src={user?.image} />
        ) : (
          <UserAvatar {...stringAvatar(user?.name)} />
        )}
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="div">
          {user?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email}
        </Typography>
        <Typography variant="body2">{user?.role}</Typography>
      </CardContent>
    </Box>
  );
}
