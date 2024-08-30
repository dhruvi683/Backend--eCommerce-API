const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/dbinit");
connectDB();

require("dotenv").config();
require("colors");

const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("welcome to the eCommerce-API");
});
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.bgGreen.black)
);
