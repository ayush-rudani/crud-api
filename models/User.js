const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, default: "user" },
    password: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    oders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("User", userSchema);