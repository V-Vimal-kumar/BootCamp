const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const users = [
    { id: 1, name: "vk" },
    { id: 2, name: "sk" },
    { id: 3, name: "ak" }
];

// Parameterized Route: Get user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Extract ID from URL & convert to number
    const user = users.find(u => u.id === userId); // Find user by ID

    if (user) {
        res.json(user); // Return user if found
    } else {
        res.status(404).json({ error: "User not found" }); // Return 404 if not found
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
