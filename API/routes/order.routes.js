const express = require("express");
const {
  createOrder,
  findOrder,
  deleteOrder,
  updateOrder,
  findAllOrders,
} = require("../controllers/order.controller");

const orderRoute = express.Router();

// Route to create an order
orderRoute.post("/createOrder", createOrder);

// Route to find a specific order by orderNumber
orderRoute.post("/findOrder", findOrder);

// Route to delete an order
orderRoute.delete("/deleteOrder", deleteOrder);

// Route to update an existing order (e.g., updating totalPrice)
orderRoute.put("/updateOrder", updateOrder);

// Route to get all orders
orderRoute.get("/findAllOrders", findAllOrders);

module.exports = orderRoute;
