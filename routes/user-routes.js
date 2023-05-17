const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller.js");
const { registerValiations, loginValiations } = require("../controllers/user-controller.js");

// Get list of all users
router.get("/", userC.getAllUser);

// User Sign Up
router.post("/signup", registerValiations, userC.signup);

// User Login
router.post("/login", loginValiations, userC.login);

// Update User Profile
router.patch("/:id", userC.updateUser);

// Delete User
router.delete("/:id", userC.deleteUser);



module.exports = router;
