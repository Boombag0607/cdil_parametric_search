const { Pool } = require('pg');
const express = require('express');
require('dotenv').config({ path: '.env.local' });

const app = express();
const port = 3000;

const dbname = process.env.DB_NAME;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: dbname,
});

pool.query(`CREATE DATABASE ${dbname}`, (error, result) => {
    if (error) {
      console.error('Error creating database:', error);
    } else {
      console.log('Database created successfully');
    }
    pool.end(); // Close the connection pool
  });
  

// app.get('/api/posts', async (req, res) => {
// try {;
// } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'An error occurred' });
// }
// });
