const { Schema, model } = require("mongoose");

const order_schema = new Schema({
  productName: {
    type: String,
    split: " ",
    required: true,
  },
  image: {
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
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

const ORDER_MODEL = model("user_order", order_schema);
module.exports = ORDER_MODEL;
