const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

module.exports = mongoose.model("Category", categorySchema);