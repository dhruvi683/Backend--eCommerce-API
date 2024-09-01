const express = require("express");
const orderRouter = express.Router;

const {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

orderRouter
  .route("/")
  .get(getAllOrders) //Get all Orders
  .post(createOrder); //create a new Order

orderRouter
  .route("/:id")
  .get(getOrderById) //Get a specific Order by ID
  .put(updateOrder) // update a specific order by ID
  .delete(deleteOrder); //Delete a specific order by ID

module.exports = orderRouter;
