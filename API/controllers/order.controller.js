const ORDER_MODEL = require("../models/order.model");

// Create a new order
const createOrder = async (req, res) => {
  const { productName, Image, price, category, orderID } = req.body;

  // Basic validation
  if (!productName || !price || !category || !orderID) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields (productName, price, category, orderID)",
    });
  }

  try {
    // Generate order number
    const lastOrder = await ORDER_MODEL.findOne().sort({ orderNumber: -1 });
    const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1000;

    const newOrder = await ORDER_MODEL.create({
      productName,
      Image,
      price,
      category,
      orderID,
      orderNumber: newOrderNumber,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

// Find a specific order by orderNumber
const findOrder = async (req, res) => {
  const { orderNumber } = req.body;
  try {
    const order = await ORDER_MODEL.findOne({ orderNumber });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order found",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

// Get all orders
const findAllOrders = async (req, res) => {
  try {
    const orders = await ORDER_MODEL.find({});
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { orderNumber } = req.body;
  try {
    const deletedOrder = await ORDER_MODEL.deleteOne({ orderNumber });
    if (deletedOrder.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

// Update order (example: updating price or category)
const updateOrder = async (req, res) => {
  const { orderNumber, price, category } = req.body;

  if (!orderNumber) {
    return res.status(400).json({
      success: false,
      message: "Order number is required",
    });
  }

  try {
    const updatedOrder = await ORDER_MODEL.findOneAndUpdate(
      { orderNumber },
      { $set: { ...(price && { price }), ...(category && { category }) } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  findOrder,
  findAllOrders,
  deleteOrder,
  updateOrder,
};
