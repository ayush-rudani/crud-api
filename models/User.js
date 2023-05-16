const mongoose = require("mongoose");
require("dotenv").config();


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, default: "user" },
    password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);