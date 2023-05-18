const express = require("express");
const router = express.Router();
const productC = require("../controllers/product-controller.js");
const Product = require("../models/Product");
const Category = require("../models/Category");


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

// 
router.post("/u/a1", async (req, res) => {
    try {
        const query = req.body.query;

        const getProductsByCategory = await Product.aggregate([
            { $match: query },
            { $group: { _id: "$name" } }
        ]);
        res.status(200).json(getProductsByCategory);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/u/:c/", async (req, res) => {
    try {

        const getProductsByC = await Product.aggregate([
            { $group: { _id: { "name": "$name", "price": "$price" } } }
        ]);
        res.status(200).json(getProductsByC);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/u/a2", async (req, res) => {
    try {
        const getProductsByPrice = await Product.aggregate([{ $sort: { price: -1 } }]);
        res.status(200).json(getProductsByPrice);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

});


router.get("/u/a3", async (req, res) => {
    try {
        const p = await Product.find({
            $and: [{ price: { $gt: 100000 } }, { price: { $lt: 1000000 } }]
        });
        res.status(200).json(p);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/u/a4", async (req, res) => {
    try {
        const join = await Product.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            }
        ]);
        res.status(200).json(join);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});





module.exports = router;