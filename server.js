const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const userR = require("./routes/user-routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: 'Working' });
})

app.use("/api/user", userR);

// Connect DataBase
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${port}`);
});

