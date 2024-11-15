const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Contact API" });
});
app.use("/api/contacts", contactRoutes);

module.exports = app;
