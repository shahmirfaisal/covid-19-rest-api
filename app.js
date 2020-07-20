const express = require("express");
const indexRoutes = require("./routes/index");
const countryRoutes = require("./routes/country");

const app = express();

app.use(indexRoutes);
app.use("/countries", countryRoutes);

// Error Handling Middleware
app.use((error, req, res, next) => {
  const { statusCode, message } = error;
  res.status(statusCode).json({ message });
});

const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT);
