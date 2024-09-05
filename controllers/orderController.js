const Order = require("../schemas/Order");
const User = require("../schemas/User");
const Product = require("../schemas/Product");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
      const orders = await Order.find()
          .populate({
              path: 'userId',
              select: 'name',  // Only select the user's name
          })
          .populate({
              path: 'products.productId',
              select: 'name',  // Only select the product's name
          });

      if (!orders.length) {
          return res.status(200).json({ message: "No orders found in the DB" });
      }
      return res.status(200).json(orders);
  } catch (error) {
      return res.status(500).json(error);
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
      const { userId, products } = req.body;

      // Calculate total price
      let total = 0;
      for (const item of products) {
          const product = await Product.findById(item.productId);
          if (!product) {
              return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
          }
          total += product.price * item.quantity;
      }

      const newOrder = new Order({
          userId,
          products,
          total,  // Set the calculated total price
      });

      const savedOrder = await newOrder.save();
      return res.status(201).json(savedOrder);
  } catch (error) {
      return res.status(500).json(error);
  }
};

// Get one order by ID
const getOneOrder = async (req, res) => {
  try {
      const { id } = req.params;
      const order = await Order.findById(id)
          .populate({
              path: 'userId',
              select: 'name',  // Only select the user's name
          })
          .populate({
              path: 'products.productId',
              select: 'name',  // Only select the product's name
          });

      if (order) {
          return res.status(200).json({ order });
      }
      return res.status(404).json({ message: 'Order not found' });
  } catch (error) {
      return res.status(500).json(error);
  }
};


// Update an order by ID
const updateOrder = async (req, res) => {
  try {
      const { id } = req.params;
      const { userId, products } = req.body;

      // Calculate the updated total price
      let total = 0;
      for (const item of products) {
          const product = await Product.findById(item.productId);
          if (!product) {
              return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
          }
          total += product.price * item.quantity;
      }

      const updatedOrder = await Order.findByIdAndUpdate(
          id,
          { userId, products, total },  // Set the updated total price
          { new: true }
      ).populate({
          path: 'userId',
          select: 'name',  // Populate user's name
      }).populate({
          path: 'products.productId',
          select: 'name',  // Populate product's name
      });

      if (!updatedOrder) {
          return res.status(404).json({ message: 'Order not found' });
      }

      return res.status(200).json(updatedOrder);
  } catch (error) {
      return res.status(500).json(error);
  }
};


// Delete a specific order by ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json({ message: "Order deleted succcessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllOrders,
  createOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
};
