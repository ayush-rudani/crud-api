const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const userR = require("./routes/user-routes");
const productR = require("./routes/product-router");
const categoryR = require("./routes/category-router");
const orderR = require("./routes/order-routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: 'Working' });
})

app.use("/api/user", userR);
app.use("/api/product", productR);
app.use("/api/category", categoryR);
app.use("/api/order", orderR);



// Connect DataBase
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${port}`);
});

