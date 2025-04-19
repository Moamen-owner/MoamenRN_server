const ORDER_MODEL = require("../models/order.model");

// Create a new order
// const createOrder = async (req, res) => {
//   const { producNtame, Image, price, category, orderID } = req.body;

//   // Basic validation
//   if (!productName || !price || !category || !orderID) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields (productName, price, category, orderID)",
//     });
//   }

//   try {
//     // Generate order number
//     const lastOrder = await ORDER_MODEL.findOne().sort({ orderNumber: -1 });
//     const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1000;

//     const newOrder = await ORDER_MODEL.create({
//       productName,
//       Image,
//       price,
//       category,
//       orderID,
//       orderNumber: newOrderNumber,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       data: newOrder,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.name,
//       message: error.message,
//     });
//   }
// };

const createOrder = async (req, res) => {
  const orders = req.body;

  if (!Array.isArray(orders) || orders.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Request body should be a non-empty array of orders",
    });
  }

  try {
    const lastOrder = await ORDER_MODEL.findOne().sort({ orderNumber: -1 });
    let orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1000;

    const createdOrders = [];

    for (const order of orders) {
      const {
        productName,
        image,
        price,
        category,
        orderID,
        quantity,
      } = order;


      // Validate required fields
      // if (!productName || !price || !category || !orderID) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Each order must include productName, price, category, and orderID",
      //   });
      // }

      const createdOrder = await ORDER_MODEL.create({
        productName,
        image,
        price: Number(price),
        category,
        orderID,
        quantity,
        orderNumber: orderNumber++,
      });

      createdOrders.push(createdOrder);
    }

    return res.status(201).json({
      success: true,
      message: "Orders created successfully",
      data: createdOrders,
    });
  } catch (error) {
    return res.status(500).json({
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

// Confirm an order
const confirmOrder = async (req, res) => {
  const { orderNumber } = req.body;
  
  if (!orderNumber) {
    return res.status(400).json({
      success: false,
      message: "Order number is required"
    });
  }

  try {
    const order = await ORDER_MODEL.findOneAndUpdate(
      { orderNumber },
      { status: 'confirmed' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order confirmed successfully",
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.name,
      message: error.message
    });
  }
};

module.exports = {
  createOrder,
  findOrder,
  findAllOrders,
  deleteOrder,
  updateOrder,
  confirmOrder
};
