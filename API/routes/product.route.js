const express = require("express");
const {
  createProduct,
  findProduct,
  deleteProduct,
  updateProduct,
  findAllProduct,
} = require("../controllers/product.controller");

const productRoute = express.Router();

productRoute.post("/createProduct", createProduct);
productRoute.post("/findProduct", findProduct);
productRoute.delete("/deleteProduct", deleteProduct);
productRoute.post("/updateProduct", updateProduct);
productRoute.get("/findAllProduct", findAllProduct);

module.exports = productRoute;
