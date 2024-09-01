const Order = require("../schemas/Order");
const User = require("../schemas/User");
const Product = require("../schemas/Product");

//Retrieve a list of all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders.length) {
      return res.status(200).json({ message: "No orders found in Database" });
    } else {
      return res.status(200).json(orders);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, products, total } = req.body;

    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // check if products exist
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.productId}not found` });
      }
    }

    //create the order
    const order = new Order({
      userId,
      products,
      total,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  Retrieve a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getAllOrders, createOrder, getOrderById };
