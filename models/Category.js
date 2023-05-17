const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    // products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }]
});

module.exports = mongoose.model("Category", categorySchema);