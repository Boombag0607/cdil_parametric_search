import express from "express";
import supabase from "../supabase.js";
const router = express.Router();
import { convertUrlToName } from "../lib/url.js";

router.get("/", function (req, res, next) {
  res.send("supabase route");
});

router.get("/data/:device", async (req, res) => {
  try {
    const { device } = req.params;
    let deviceData = [];
    for (let i = 0; i < 20; i++) {
      const dataResponse = await supabase
        .from("devices")
        .select(`d${i + 1}`)
        .eq("id", device);

      deviceData.push(dataResponse.data[0][`d${i + 1}`]);
    }

    res.json(deviceData);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Not found");
  }
});

router.get("/headers/:subCat", async (req, res) => {
  try {
    const subCat = convertUrlToName(req.params.subCat);
    let headers = [];
    console.log(subCat);
    for (let i = 0; i < 20; i++) {
      const subcategoryResponse = await supabase
        .from("sub_categories")
        .select(`h${i + 1}`)
        .eq("id", subCat);

      if (subcategoryResponse.data[0][`h${i + 1}`] !== null) {
        headers.push(subcategoryResponse.data[0][`h${i + 1}`]);
      }
    }
    res.json(headers);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Not found");
  }
});

router.get("/units/:subCat", async (req, res) => {
  try {
    const subCat = convertUrlToName(req.params.subCat);
    let units = [];
    console.log(subCat);
    for (let i = 0; i < 20; i++) {
      const subcategoryResponse = await supabase
        .from("sub_categories")
        .select(`u${i + 1}`)
        .eq("id", subCat);

      if (subcategoryResponse.data[0][`u${i + 1}`] !== null) {
        units.push(subcategoryResponse.data[0][`u${i + 1}`]);
      }
    }
    res.json(units);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Not found");
  }
});

router.get("/devices", async (req, res) => {
  try {
    const allData = await supabase.from("devices").select("*");
    res.json(allData);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Not found");
  }
});

router.get("/devices/:subCat", async (req, res) => {
  try {
    const subCat = convertUrlToName(req.params.subCat);
    let { data, error } = await supabase
      .from("devices")
      .select("*")
      .eq("subcat_id", subCat);
    if (error) {
      console.error(error);
    }
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Not found");
  }
});

router.get("/devicesincat/:category", async (req, res) => {
  try {
    const category = convertUrlToName(req.params.category);
    const subCatResponse = await supabase
      .from("categories")
      .select("*")
      .eq("name", category);

    const subCatData = subCatResponse.data[0];
    const subCatArray = subCatData.sub_cat.types;

    let devices = [];

    for (let i = 0; i < subCatArray.length; i++) {
      const subCat = subCatArray[i];
      const deviceResponse = await supabase
        .from("devices")
        .select("*")
        .eq("subcat_id", subCat);

      const deviceData = deviceResponse.data;
      devices.push(...deviceData);
    }
    res.json(devices);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Not found");
  }
});

router.get("/subcategories", async (req, res) => {
  try {
    const { data, error } = await supabase.from("subcategories").select("*");
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Not found");
  }
});

router.get("/categories", async (req, res) => {
  try {
    let { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.error(error);
    }
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Not found");
  }
});

router.get("/packages", async (req, res) => {
  try {
    let { data, error } = await supabase.from("packages").select("*");
    console.log("data for packages :: --- ", data);
    if (error) {
      console.error(error);
    }
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Not found");
  }
});

router.get("/industries", async (req, res) => {
  try {
    let { data, error } = await supabase.from("industries").select("*");
    if (error) {
      console.error(error);
    }
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Not found");
  }
});

export default router;
