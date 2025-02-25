const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Custom Error Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Sample Route (Without Error)
app.get("/", (req, res) => {
  res.send("Welcome to our API!");
});

// Sample Route (Triggering an Error)
app.get("/error", (req, res, next) => {
  next(new AppError("This is a custom error!", 400));
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      code: err.statusCode || 500,
    },
  });
});

// Handle 404 Errors
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
