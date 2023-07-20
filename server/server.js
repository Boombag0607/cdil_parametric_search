const pool = require('./db');
const cors = require('cors');
const express = require('express');
require('dotenv').config({ path: '.env.local' });

const app = express();
const port = 3000;

const dbname = process.env.DB_NAME;

// middleware
app.use(cors());
app.use(express.json());


// server

app.get("/", async(req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM parameters");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
})

app.get("/:id", async(req, res) => {
  try {
    // const allPosts = await pool.query("SELECT * FROM cdillocal");
    // res.json();
    const { id } = req.params.id;
    const data = await pool.query("SELECT * FROM cdillocal WHERE id = $1", [id]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
}) 

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

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
