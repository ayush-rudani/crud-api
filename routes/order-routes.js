const express = require("express");
const router = express.Router();
const orderC = require("../controllers/order-controller.js");

// Get list of all orders
router.get("/", orderC.getAllOrder);

// Get single order
router.get("/:id", orderC.getSingleOrder);

// Create new order
router.post("/", orderC.createOrder);

// // Update order
router.patch("/:id", orderC.updateOrder);

// // Delete order
router.delete("/:id", orderC.deleteOrder);

module.exports = router;
