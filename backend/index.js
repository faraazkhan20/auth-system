const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const authRoutes = require("./routes/authRoutes");

app.use(express.json()); // Middleware
app.use(cors()); // Middleware
app.use("/", authRoutes); // Middleware

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // console.log("Hello Express!");
});
