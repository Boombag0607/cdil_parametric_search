import express from 'express';
import pool from '../db.js';
import { convertUrlToName } from '../lib/url.js';
import { extractStringsInQuotes } from '../lib/string.js';
import { createLogger, transports, format } from 'winston';
const router = express.Router();

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.simple()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

router.get("/", function (_, res, next) {
  res.send("user path");
});

router.get("/data/:device", (req, res) => {
  const { device } = req.params;
  pool.query(`SELECT d1, d2, d3, d4, d5,
              d6, d7, d8, d9, d10,
              d11, d12, d13, d14, d15,
              d16, d17, d18, d19, d20
       FROM devices 
       WHERE id = ?`,
      [device],
      (error, results) => {
    if (error) {
      logger.error('Error in /data/[device] query: ', error);
      return res.status(404).json({
        error: 'Internal Server Error',
        message: 'An error occurred while processing your request.',
      });
    }
    res.json(results[0]);
   });
});

router.get("/headers/:subCat", (req, res) => {
  const subCat = convertUrlToName(req.params.subCat);
  pool.query(
    `SELECT h1, h2, h3, h4, h5,
            h6, h7, h8, h9, h10,
            h11, h12, h13, h14, h15,
            h16, h17, h18, h19, h20
      FROM subcategories
      WHERE id = ?`,
    [subCat],
    (error, results) => {
    if (error) {
      logger.error('Error in /headers/[subCat] query: ', error);
      return res.status(404).json({
        error: 'Internal Server Error',
        message: 'An error occurred while processing your request.',
      });
    }
    const subcatHeadersArray = Object.values(results[0]).filter(
      (header) => header !== ""
    );
    res.json(subcatHeadersArray);
  });
});

router.get("/units/:subCat", (req, res) => {
  const subCat = convertUrlToName(req.params.subCat);
  pool.query(
    `SELECT u1, u2, u3, u4, u5,
            u6, u7, u8, u9, u10,
            u11, u12, u13, u14, u15,
            u16, u17, u18, u19, u20
      FROM subcategories
      WHERE id = ?`,
    [subCat],
    (error, results) => {
      if (error) {
        logger.error('Error in /units/[subCat] query: ', error);
        return res.status(404).json({
          error: 'Internal Server Error',
          message: 'An error occurred while processing your request.',
        });
      }
      const subcatUnitsArray = Object.values(results[0]).filter(
        (header) => header !== ""
      );
      res.json(subcatUnitsArray);
  });
});

router.get("/devices", (_, res) => {
  pool.query(`SELECT * FROM devices`, 
  (error, results) => {
    if (error) {
      logger.error('Error in /devices query: ', error);
      return res.status(404).json({
        error: 'Internal Server Error',
        message: 'An error occurred while processing your request.',
      });
    }
    res.json(results);
  });
});

router.get("/devices/:subCat", (req, res) => {
  const subCat = convertUrlToName(req.params.subCat);
  pool.query(
    `SELECT * FROM devices WHERE subcat_id = ?`,
    [subCat],
    (error, results) => {
      if (error) {
        logger.error('Error in /data/[device] query: ', error);
        return res.status(404).json({
          error: 'Internal Server Error',
          message: 'An error occurred while processing your request.',
        });
      }
    res.json(results);
  });
});

router.get("/devicesInCat/:category", (req, res) => {
  const category = convertUrlToName(req.params.category);
  pool.query(
    `SELECT subcat FROM categories WHERE name = ?`,
    [category],
    (error, results) => {
    if (error) {
      logger.error('Error in /devicesInCat/[category] query: ', error);
      return res.status(404).json({
        error: 'Internal Server Error',
        message: 'An error occurred while processing your request.',
      });
    }

    const subCatArray = extractStringsInQuotes(results[0].subcat);
    let devices = [];

    let queriesCompleted = 0;

    for (let i = 0; i < subCatArray.length; i++) {
      const subCat = subCatArray[i];
      pool.query(
        `SELECT * FROM devices WHERE subcat_id = ?`,
        [subCat],
        (err, deviceRes) => {
        if (err) {
          logger.error('Error in /devicesInCat/[category] query: ', error);
          return res.status(404).json({
            error: 'Internal Server Error',
            message: 'An error occurred while processing your request.',
          });
        }
        devices.push(...deviceRes);
        queriesCompleted++;
        if (queriesCompleted === subCatArray.length) {
          res.json(devices);
        }
      });
    }
  });
});


router.get("/subcategories", (req, res) => {
  pool.query(`SELECT * FROM subcategories`, (error, results)=> {
    if (error) {
      logger.error('Error in /subcategories query: ', error);
      return res.status(404).json({
        error: 'Internal Server Error',
        message: 'An error occurred while processing your request.',
      });
    }
    res.json(results); 
  });
});

router.get("/categories", async (req, res) => {
  pool.query('SELECT * FROM categories', (error, results) => {
    if (error) {
      logger.error('Error in /categories query: ', error);
      return res.status(404).json({
        error: 'Internal Server Error',
        message: 'An error occurred while processing your request.',
      }); 
    }
    res.json(results);
  });
});

router.get("/packages", (req, res) => {
  pool.query(`SELECT * FROM packages`, (error, results) => {
    if (error) {
      logger.error('Error in /packages query: ', error);
      return res.status(404).json({
        error: 'Internal Server Error',
        message: 'An error occurred while processing your request.',
      }); 
    }
    res.json(results);
  });
});

router.get("/industries", async (req, res) => {
  pool.query(`SELECT * FROM industries`, (error, results) => {
    if (error) {
      logger.error('Error in /industries query: ', error);
      return res.status(404).json({
        error: 'Internal Server Error',
        message: 'An error occurred while processing your request.',
      }); 
    }
    res.json(results);
  });
});

export default router;
