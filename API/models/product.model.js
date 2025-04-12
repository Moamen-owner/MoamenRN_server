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
  weight:{
    type: Number,
  },

  price: {
    type: Number,
    required: true,
  },
  category:{
  type:String,
  required:true,
  },
});

const PRODUCT_MODEL = model("product", productSchema);
module.exports = PRODUCT_MODEL;
