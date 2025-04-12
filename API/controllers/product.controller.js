const PRODUCT_MODEL = require("../models/product.model");

const createProduct = async (req, res) => {
  const { productName, Image, price , category ,weight} = req.body;
  try {
    const user = await PRODUCT_MODEL.create({
      productName: productName,
      Image: Image,
      price: price,
      category: category,
      weight: weight,
    });

    res.status(200).json({
      success: true,
      message: "product created",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

const findProduct = async (req, res) => {
  const { productName, Image, price } = req.body;
  try {
    const users = await PRODUCT_MODEL.find({ productName });
    res.status(200).json({
      success: true,
      message: "product found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

const findAllProduct = async (req, res) => {
  try {
    const products = await PRODUCT_MODEL.find({});
    res.status(200).json({
      success: true,
      message: "products found",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { productName } = req.body;
  try {
    const user = await PRODUCT_MODEL.deleteOne({ productName });
    res.status(200).json({
      success: true,
      message: "product deleted",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { productName, price } = req.body;
  try {
    const user = await PRODUCT_MODEL.findOneAndUpdate(
      { productName },
      { $set: { price } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "product updated ",
      data: user,
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
  createProduct,
  findProduct,
  deleteProduct,
  updateProduct,
  findAllProduct
};
