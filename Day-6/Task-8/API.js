const express = require("express");
const app = express();

app.use(express.json());

// Welcome Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our API!" });
});

// Sample Route with Parameters
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.json({ userId, message: "User details fetched successfully!" });
});

// Sample Route with Query Params
app.get("/search", (req, res) => {
  const { q } = req.query;
  res.json({ query: q, message: "Search results" });
});

// Sample POST Request
app.post("/user", (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ success: true, name, email, message: "User created!" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      code: err.statusCode || 500,
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: "Route not found",
      code: 404,
    },
  });
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
