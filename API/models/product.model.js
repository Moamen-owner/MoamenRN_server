const { Schema, model } = require("mongoose");

const productSchema = new Schema({
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
  category:{
  type:String,
  },
});

const PRODUCT_MODEL = model("product", productSchema);
module.exports = PRODUCT_MODEL;
