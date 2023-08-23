const pool = require("./db");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
// require("dotenv").config({ path: ".env.local" });

const app = express();
const port = 3000;

// const dbname = process.env.DB_NAME;

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// server

app.get("/data", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM device`);
    const jsonData = allData.rows;
    res.json(jsonData);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/data/:device", async (req, res) => {
  try {
    const { device } = req.params;
    const allData = await pool.query(`SELECT * FROM  device WHERE "ID" = $1`, [device]);
    res.json(allData.rows[0].data);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/parameters/:subCat", async (req, res) => {
  try {
    const subCat = req.params.subCat.replace(/_/g, " ");
    const allData = await pool.query(
      `SELECT subcat_header FROM sub_cat WHERE "ID" = $1`,
      [subCat]
    );
    const jsonData = allData.rows;
    res.json(jsonData[0].subcat_header);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/category", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM category`);
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/admin/subcat_header", async (req, res) => {
  const { id, packaging, columns, groupName, colSpan } = req.body;

  try {
    // Insert the data into the device_params table
    const insertQuery = `
      INSERT INTO device_params (id, packaging, columns, group_name, col_span)
      VALUES ($1, $2, $3, $4, $5)
    `;

    await pool.query(insertQuery, [id, packaging, columns, groupName, colSpan]);

    res
      .status(201)
      .json({ message: "Data successfully added to device_params table" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding data to the database" });
  }
});

// Assuming you have set up the Express app as 'app', the PostgreSQL pool as 'pool', and the server is running on port 5000

// POST route to handle adding data to a dynamic column
app.post("/admin/device", urlencodedParser, (req, res) => {
  const { device_name } = req.params; // Get the dynamic column name from the route parameters
  const { val_dict } = req.body; // Get the value to be added to the dynamic column from the request body

  // Validate that "value" is not empty or null
  if (!val_dict) {
    return res.status(400).json({ error: "Value cannot be empty or null." });
  }

  const pairArray = Object.entries(val_dict).map(([param, val]) => [
    param,
    val,
  ]);
  console.log(pairArray);
  const paraCols = pairArray.map((x, i) => pairArray[i][0]).join(",");
  const valArray = pairArray.map((x, i) => pairArray[i][1]);

  // const val_dict_jsonb = JSON.stringify(val_dict);

  // Check if the dynamic column exists in the table
  const upsertQuery = `
    INSERT INTO parameters (device_name, ${paraCols})
    VALUES ($1, ${valArray.map((_, i) => `$${i + 2}`).join(", ")})
    ON CONFLICT (device_name)
    DO UPDATE SET ${paraCols
      .split(",")
      .map((col) => `${col} = EXCLUDED.${col}`)
      .join(", ")}
  `;
  // Check if the dynamic column exists in the table
  // const upsertQuery = `
  //   INSERT INTO parameters (device_name, ${paraCols})
  //   VALUES ($1, (JSONB_TO_RECORD(${pairArray})).*)
  //   ON CONFLICT (device_name)
  //   DO UPDATE SET val_dict = EXCLUDED.val_dict
  // `;

  pool
    .query(upsertQuery, [device_name, ...valArray])
    .then(() => {
      res.json({
        success: true,
        message: `Value '${val_dict}' added to the '${device_name}' column for device_name '${device_name}'`,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the database." });
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
