import express from "express";
import path from "path";
// const bodyParser = require("body-parser");
// const pool = require("./db");
// require("dotenv").config({ path: ".env.local" });

const app = express();
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";

// Middleware and other server configurations

// Use clientRoutes for the main client application
app.use("/user", userRoutes);

// Use adminRoutes for the admin section
app.use("/admin", adminRoutes);

// Start the server
const port = 3000;
app.use(express.static(path.join(process.env.BUILD_PATH || " ")));

// const dbname = process.env.DB_NAME;
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: 'YOUR_CLIENT_ID',
//       clientSecret: 'YOUR_CLIENT_SECRET',
//       callbackURL: '/auth/google/callback', // Specify the callback URL
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // Handle the user's profile data and store it in your database
//       // The profile parameter contains user information
//       // You can use the "done" callback to handle user authentication
//       // and return the user's information to your routes.
//       return done(null, profile);
//     }
//   )
// );

// app.get(
//   '/auth/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email'], // Define the required permissions
//   })
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/admin', // Redirect on successful authentication
//     failureRedirect: '/', // Redirect on failure
//   })
// );

// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/'); // Redirect unauthenticated users
// }

// // Apply the isAuthenticated middleware to your admin route
// app.get('/admin', isAuthenticated, (req, res) => {
//   // Render the admin page or handle admin functionality
// });

// // middleware
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// passport.serializeUser((user, done) => {
//   // Serialize the user data to be stored in the session
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   // Deserialize the user data from the session
//   done(null, user);
// });

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

// pool.query(`CREATE DATABASE ${dbname}`, (error, result) => {
//     if (error) {
//       console.error('Error creating database:', error);
//     } else {
//       console.log('Database created successfully');
//     }
//     pool.end(); // Close the connection pool
//   });

// app.get('/api/posts', async (req, res) => {
// try {;
// } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'An error occurred' });
// }
// });
