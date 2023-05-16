const express = require("express");
const router = express.Router();
const categoryC = require("../controllers/category-controller.js");

// Get list of all categories
router.get("/", categoryC.getAllCategory);

// Create new category
router.post("/", categoryC.createCategory);

// Update category
router.patch("/:id", categoryC.updateCategory);

module.exports = router;