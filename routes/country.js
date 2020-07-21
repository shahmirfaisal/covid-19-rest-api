const router = require("express").Router();
require("dotenv").config();
const request = require("request-promise");
const cheerio = require("cheerio");
const extractData = require("../utils/extract-data");
const errorHandler = require("../utils/error-handler");

router.get("/", async (req, res, next) => {
  const { URL } = process.env;

  try {
    const html = await request(URL);
    const $ = cheerio.load(html);
    const rows = $("#main_table_countries_today > tbody:nth-child(2)").children(
      "tr"
    );

    const countries = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const isHide = $(row).css("display") === "none";

      if (!isHide) {
        const country = extractData($, row);

        // We only want countries related info
        if (country.name === "World") continue;

        countries.push(country);
      }
    }

    res.status(200).json(countries);
  } catch (error) {
    errorHandler(next, "Something went wrong!");
  }
});

router.get("/:countryName", async (req, res, next) => {
  const countryName = req.params.countryName.trim().toLowerCase();
  const { URL } = process.env;

  try {
    var html = await request(URL);
  } catch (error) {
    return errorHandler(next, "Something went wrong!");
  }

  const $ = cheerio.load(html);
  const rows = $("#main_table_countries_today > tbody:nth-child(2)").children(
    "tr"
  );

  let country;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const name = $(row).children("td").eq(1).text().trim().toLowerCase();
    
    // We only want countries related info
    if (countryName === "World") continue;

    if (countryName === name) {
      country = extractData($, row);
      break;
    }
  }

  if (!country) return errorHandler(next, "No country found!", 404);

  res.status(200).json(country);
});

module.exports = router;
