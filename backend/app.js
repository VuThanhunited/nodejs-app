const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const movieRoutes = require("./routes/movie");

const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// sử dụng routes
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node.js on Render!");
});

// xử lý route không tồn tại
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:5000");
});
