const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const cors = require("cors");
const connectDB = require("./db/dbinit");
connectDB();

//middleeware :this should be always be there
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //this is for form data

const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("welcome to the eCommerce-API");
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`.bgGreen.black);
});
