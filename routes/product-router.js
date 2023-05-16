const express = require("express");
const router = express.Router();
const productC = require("../controllers/product-controller.js");

// Get list of all products
router.get("/", productC.getAllProduct);

// Get single product
router.get("/:id", productC.getSingleProduct);

// Create new product
router.post("/", productC.createProduct);

// Update product
router.patch("/:id", productC.updateProduct);

// Delete product
router.delete("/:id", productC.deleteProduct);

module.exports = router;