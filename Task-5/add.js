const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const FILE_PATH = "users.json";

app.use(express.json()); // Middleware to parse JSON

// Read data from users.json
const readData = () => {
    try {
        const data = fs.readFileSync(FILE_PATH, "utf8");
        return JSON.parse(data) || [];
    } catch (error) {
        return [];
    }
};

// Write data to users.json
const writeData = (data) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf8");
};

// Get all users
app.get("/users", (req, res) => {
    res.json(readData());
});

// Get a user by ID
app.get("/users/:id", (req, res) => {
    const users = readData();
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// Create a new user
app.post("/users", (req, res) => {
    const users = readData();
    const newUser = { id: Date.now(), ...req.body };
    users.push(newUser);
    writeData(users);
    res.status(201).json(newUser);
});

// Update a user by ID
app.put("/users/:id", (req, res) => {
    let users = readData();
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        writeData(users);
        res.json(users[index]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Delete a user by ID
app.delete("/users/:id", (req, res) => {
    let users = readData();
    const newUsers = users.filter(u => u.id !== parseInt(req.params.id));
    
    if (newUsers.length !== users.length) {
        writeData(newUsers);
        res.json({ message: "User deleted successfully" });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
