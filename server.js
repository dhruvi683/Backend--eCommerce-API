const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const cors = require("cors");
const connectDB = require("./db/dbinit");
connectDB();

const userRouter = require("./Routes/userRoute");
const productRouter = require("./Routes/productRoute");
const categoryRouter = require("./Routes/categoryRoute");
const orderRouter = require("./Routes/orderRoute");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("welcome to the eCommerce-API");
});

// Routes
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.bgGreen.black)
);
