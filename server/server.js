const pool = require("./db");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: ".env.local" });

const app = express();
const port = 3000;

// const dbname = process.env.DB_NAME;

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// server

app.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM device");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/:id", async (req, res) => {
  try {
    // const allPosts = await pool.query("SELECT * FROM cdillocal");
    // res.json();
    const { id } = req.params;
    const data = await pool.query("SELECT * FROM device WHERE id = $1", [id]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Assuming you have set up the Express app as 'app', the PostgreSQL pool as 'pool', and the server is running on port 5000

// POST route to handle adding data to a dynamic column
app.post("/admin/:device_name", (req, res) => {
  const { device_name } = req.params; // Get the dynamic column name from the route parameters
  const { param } = req.body; // Get the value to be added to the dynamic column from the request body

  // Validate that "value" is not empty or null
  if (!param) {
    return res.status(400).json({ error: "Value cannot be empty or null." });
  }

  // Check if the dynamic column exists in the table
  const checkColumnQuery = `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'parameters' AND column_name = $1
  `;

  pool
    .query(checkColumnQuery, [device_name])
    .then((result) => {
      if (result.rows.length === 0) {
        // Column does not exist, so create the column first
        const createColumnQuery = `ALTER TABLE parameters ADD COLUMN ${device_name} VARCHAR(255)`;

        pool
          .query(createColumnQuery)
          .then(() => {
            // Column created, now insert the value
            const insertValueQuery = `UPDATE parameters SET ${device_name} = $1 WHERE ${device_name} = $2`;

            pool
              .query(insertValueQuery, [param, device_name])
              .then(() => {
                res.json({
                  success: true,
                  message: `Column '${device_name}' created and value '${param}' added to it for device_name '${device_name}'`,
                });
              })
              .catch((error) => {
                console.error("Error:", error);
                res
                  .status(500)
                  .json({
                    error: "An error occurred while updating the database.",
                  });
              });
          })
          .catch((error) => {
            console.error("Error:", error);
            res
              .status(500)
              .json({ error: "An error occurred while creating the column." });
          });
      } else {
        // Column already exists, so just insert the value
        const insertValueQuery = `UPDATE parameters SET ${device_name} = $1 WHERE ${device_name} = $2`;

        pool
          .query(insertValueQuery, [param, device_name])
          .then(() => {
            res.json({
              success: true,
              message: `Value '${param}' added to the '${device_name}' column for device_name '${device_name}'`,
            });
          })
          .catch((error) => {
            console.error("Error:", error);
            res
              .status(500)
              .json({
                error: "An error occurred while updating the database.",
              });
          });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while checking the column." });
    });
});

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
