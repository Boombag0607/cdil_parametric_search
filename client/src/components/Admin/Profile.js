// import {
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function AdminProfile() {
//   const [user, setUser] = useState();
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/user`);
//         setUser(response.data);
//       } catch (err) {
//         console.error(err.message);
//       }
//       setUser({
//         name: "Ananya Gautam",
//         email: "ananyagautam0607@gmail.com",
//         role: "ADMIN",
//       });
//     };

//     getUser();
//   });
//   return (
//     <Card>
//       <Box
//         sx={{
//           width: "100%",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <CardMedia>
//         <Avatar
//           sx={{
//             height: "200px",
//             width: "200px",
//           }}
//         >
//           H
//         </Avatar>
//         </CardMedia>
//         <CardContent>
//           <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//             ADMIN
//           </Typography>
//           <Typography variant="h5" component="div">
//             {`user.name`}
//           </Typography>
//           <Typography sx={{ mb: 1.5 }} color="text.secondary">
//             {`user`}
//           </Typography>
//           <Typography variant="body2">{`user`}</Typography>
//         </CardContent>
//       </Box>
//     </Card>
//   );
import {
  Avatar,
  Box,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

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
      });
    };

    getUser();
  }, []); // Ensure useEffect runs only once with an empty dependency array.

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center align horizontally
        justifyContent: "center", // Center align vertically
      }}
    >
      <CardMedia>
        <Avatar
          sx={{
            height: "200px",
            width: "200px",
          }}
        >
          H
        </Avatar>
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="div">
          {user?.name} {/* Use curly braces to access variable */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email} {/* Use curly braces to access variable */}
        </Typography>
        <Typography variant="body2">
          {user?.role} {/* Use curly braces to access variable */}
        </Typography>
      </CardContent>
    </Box>
  );
}
