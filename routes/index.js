const router = require("express").Router();
const request = require("request-promise");
const cheerio = require("cheerio");
require("dotenv").config();

router.get("/all", async (req, res, next) => {
  const { URL } = process.env;

  const html = await request(URL);
  const $ = cheerio.load(html);

  const totalCases = $("#maincounter-wrap > div > span").eq(0).text();
  const totalDeaths = $("#maincounter-wrap > div > span").eq(1).text();
  const totalRecovered = $("#maincounter-wrap > div > span").eq(2).text();
  const activeCases = $(
    "body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(14) > div > div.panel-body > div > div.panel_front > div.number-table-main"
  ).text();
  const closedCases = $(
    "body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(15) > div > div.panel-body > div > div.panel_front > div.number-table-main"
  ).text();

  res.status(200).json({
    totalCases,
    totalDeaths,
    totalRecovered,
    activeCases,
    closedCases,
  });
});

module.exports = router;
