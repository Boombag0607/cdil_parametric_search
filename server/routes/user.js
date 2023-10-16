const express = require("express");
const pool = require("../db");
const router = express.Router();
import { convertUrlToName } from "../lib/url";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// server
router.get("/data", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM devices`);
    const jsonData = allData.rows;

    res.json(jsonData);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/data/:device", async (req, res) => {
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

router.get("/headers/:subCat", async (req, res) => {
  try {
    const subCat = convertUrlToName(req.params.subCat);
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

router.get("/units/:subCat", async (req, res) => {
  try {
    const subCat = convertUrlToName(req.params.subCat);
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

router.get("/devices", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM devices`);
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/devices/:subCat", async (req, res) => {
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

router.get("/devicesInCat/:category", async (req, res) => {
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
      const subCat = subCatArray[i];
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

router.get("/subcategories", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM subcategories`);
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM categories`);
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/packages", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM packages`);
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/industries", async (req, res) => {
  try {
    const allData = await pool.query(`SELECT * FROM industries`);
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
