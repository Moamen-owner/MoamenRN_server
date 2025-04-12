const { Schema, model } = require("mongoose");

const order_schema = new Schema({
  productName: {
    type: String,
    split: " ",
    required: true,
  },
  Image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: Number,
    required: true,
  },
  orderID: {
    type: String,
    required: true,
  },
}, {timestamps});

const ORDER_MODEL = model("user_order", order_schema);
module.exports = ORDER_MODEL;
