const Product = require("../models/Product");
const Category = require("../models/Category");

// Get list of all category
const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

// Product.find().populate("category");

// Create new category
const createCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name,
    });
    try {
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

// Update category
const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.updateOne({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
            }
        });
        res.status(201).json(updatedCategory);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

// Delete category
const deleteCategory = async (req, res) => {
    try {
        const removedCategory = await Category.remove({ _id: req.params.id });
        res.status(200).json(removedCategory);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

module.exports = {
    getAllCategory, createCategory, updateCategory, deleteCategory
}