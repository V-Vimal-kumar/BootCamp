const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON requests

// Hardcoded array to store users
let users = [];

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the User API!");
});

// POST endpoint to add a new user
app.post("/users", (req, res) => {
    const newUser = req.body; // Get user data from request body
    users.push(newUser); // Add new user to array
    res.json({ message: "User added" }); // Send response
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
