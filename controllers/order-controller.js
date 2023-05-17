const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const Order = require("../models/Order");

// Get list of all products
const getAllOrder = async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

// get single order
const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

// Create new Order
const createOrder = async (req, res) => {
    const { userid, products_id } = req.body;
    console.log(req.body.products_id);

    const products = await Product.find({ _id: { $in: products_id } });

    // console.log(products);

    if (products.length === 0) {
        return res.status(404).json({ message: "Product not found" });
    }

    let total = 0;

    products.map((product) => {
        total += product.price
    });

    console.log(products[0]);

    const newOrder = new Order({
        user: userid,
        products: [products[0]._id],
        totalCost: total
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.updateOne({ _id: req.params.id }, {
            $set: {
                user: req.body.user,
                products: req.body.products,
                totalCost: req.body.totalCost
            }
        });
        res.status(201).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndRemove(req.params.id);
        res.status(201).json({ deletedOrder, message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}




module.exports = {
    getAllOrder, getSingleOrder, createOrder, updateOrder, deleteOrder
}



