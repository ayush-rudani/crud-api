const Product = require("../models/Product");
const Category = require("../models/Category");

// Get list of all products
const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

// Get single product
const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

// Create new product
const createProduct = async (req, res) => {
    const category = await Category.findOne({ name: req.body.category });

    if (category.length === 0) {
        return res.status(404).json({ message: "Category not found" });
    }

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: category._id
    });

    try {
        const savedProduct = await product.save();
        await category.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

// Update product
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category
            }
        });
        res.status(201).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}


// Delete product
const deleteProduct = async (req, res) => {
    try {
        const removedProduct = await Product.findByIdAndRemove(req.params.id);
        res.status(200).json({ removedProduct, message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}


const getProductsBy
    = async (req, res) => {
        try {
            const getProductsByCategory = await Product.aggregate([
                { $match: { category: req.params.c } },
                { $group: { _id: "$name" } }
            ]);

            const getProductsByC = await Product.aggregate([
                { $group: { _id: { "name": "$name", "price": "$price" } } }
            ]);

            const getProductsByPrice = await Product.aggregate([{ $sort: { price: -1 } }]);

            const joint1 = await Product.find({
                $and: [{ price: { $gt: 100000 } }, { price: { $lt: 1000000 } }]
            });

            const join1 = await Product.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                }
            ]);



            res.status(200).json(join1);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }

    }


module.exports = {
    getAllProduct, getSingleProduct, createProduct, updateProduct, deleteProduct, getProductsBy

}