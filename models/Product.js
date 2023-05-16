const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" }
});

module.exports = mongoose.model("Product", productSchema);