module.exports = ($, row) => {
  const name = $(row).children("td").eq(1).text();
  const totalCases = $(row).children("td").eq(2).text().trim() || 0;
  const newCases = $(row).children("td").eq(3).text().trim() || 0;
  const totalDeaths = $(row).children("td").eq(4).text().trim() || 0;
  const newDeaths = $(row).children("td").eq(5).text().trim() || 0;
  const totalRecovered = $(row).children("td").eq(6).text().trim() || 0;
  const activeCases = $(row).children("td").eq(8).text().trim() || 0;
  const criticalCases = $(row).children("td").eq(9).text().trim() || 0;
  const population = $(row).children("td").eq(14).text().trim() || 0;

  const country = {
    name,
    totalCases,
    newCases,
    totalDeaths,
    newDeaths,
    totalRecovered,
    activeCases,
    criticalCases,
    population,
  };

  return country;
};
