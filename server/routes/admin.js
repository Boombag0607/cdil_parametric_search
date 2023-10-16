import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/subcat_header", async (req, res) => {
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
router.post("/device", urlencodedParser, (req, res) => {
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

export default router;
