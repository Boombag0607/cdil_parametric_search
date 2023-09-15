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
    const allData = await pool.query(`SELECT * FROM devices`);
    const jsonData = allData.rows;

    res.json(jsonData);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/data/:device", async (req, res) => {
  try {
    const { device } = req.params;
    const deviceData = await pool.query(
      `SELECT d1,d2,d3,d4,d5,
              d6,d7,d8,d9,d10,
              d11,d12,d13,d14,d15,
              d16,d17,d18,d19,d20
       FROM devices 
       WHERE id = $1`,
      [device]
    );

    const jsonData = deviceData.rows[0];

    // Construct an array with device data
    const deviceDataArray = Object.values(jsonData).filter(
      (data) => data !== null || ""
    );

    res.json(deviceDataArray);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/headers/:subCat", async (req, res) => {
  try {
    const subCat = req.params.subCat.replace(/_/g, " ");
    const subcategoryData = await pool.query(
      `SELECT subcat_h1, subcat_h2, subcat_h3, subcat_h4, subcat_h5,
              subcat_h6, subcat_h7, subcat_h8, subcat_h9, subcat_h10,
              subcat_h11, subcat_h12, subcat_h13, subcat_h14, subcat_h15,
              subcat_h16, subcat_h17, subcat_h18, subcat_h19, subcat_h20
       FROM subcategories
       WHERE id = $1`,
      [subCat]
    );

    const jsonData = subcategoryData.rows[0];

    // Construct an array with subcategory headers
    const subcatHeadersArray = Object.values(jsonData).filter(
      (header) => header !== null
    );

    res.json(subcatHeadersArray);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/units/:subCat", async (req, res) => {
  try {
    const subCat = req.params.subCat.replace(/_/g, " ");
    const subcategoryData = await pool.query(
      `SELECT subcat_u1, subcat_u2, subcat_u3, subcat_u4, subcat_u5,
              subcat_u6, subcat_u7, subcat_u8, subcat_u9, subcat_u10,
              subcat_u11, subcat_u12, subcat_u13, subcat_u14, subcat_u15,
              subcat_u16, subcat_u17, subcat_u18, subcat_u19, subcat_u20
       FROM subcategories
       WHERE id = $1`,
      [subCat]
    );

    const jsonData = subcategoryData.rows[0];

    // Construct an array with subcategory headers
    const subcatHeadersArray = Object.values(jsonData).filter(
      (header) => header !== null
    );

    res.json(subcatHeadersArray);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/devices", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM devices`);
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/devices/:subCat", async (req, res) => {
  try {
    const subCat = req.params.subCat.replace(/_/g, " ");
    const allData = await pool.query(
      `SELECT * FROM devices WHERE subcat_id = $1`,
      [subCat]
    );
    const jsonData = allData.rows;
    res.json(jsonData);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/devicesInCat/:category", async (req, res) => {
  try {
    const category = req.params.category.replace(/_/g, " ").trim();
    console.log(category);
    const subCatData = await pool.query(
      `SELECT sub_cat FROM categories WHERE name=$1`,
      [category]
    );
    // console.log("SQL Query:", subCatData.query.text);
    const subCatArray = subCatData.rows[0].sub_cat;
    let devices = [];

    for (let i = 0; i < subCatArray.length; i++) {
      const subCat = subCatArray[i]
      const deviceData = await pool.query(
        `SELECT * FROM devices WHERE subcat_id = $1`,
        [subCat]
      );
      devices.push(...deviceData.rows);
    }

    res.json(devices);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/subcategories", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM subcategories`);
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/categories", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM categories`);
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/packages", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM packages`);
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/industries", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM industries`);
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/admin/subcat_ueader", async (req, res) => {
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
