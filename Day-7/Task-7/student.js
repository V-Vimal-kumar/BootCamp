require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  rollNo: { type: Number, unique: true },
  userId: { type: String, unique: true },
  age: Number,
  class: String,
});

const User = mongoose.model("User", userSchema);

// PUT - Update User by ID
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rollNo, userId, ...updateData } = req.body;

    let updateFields = { ...updateData };

    if (rollNo || userId) {
      const existingUser = await User.findOne({
        $or: [{ rollNo }, { userId }],
        _id: { $ne: id },
      });

      if (existingUser) {
        return res.status(400).json({
          error: "Conflict: rollNo or userId already exists for another user.",
        });
      }

      if (rollNo) updateFields.rollNo = rollNo;
      if (userId) updateFields.userId = userId;
    }

    // Update the user record
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// GET - Fetch Users with Pagination
app.get("/users", async (req, res) => {
  try {
    let { page = 1, pageSize = 10 } = req.query; // Default: page 1, 10 users per page
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);

    const users = await User.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      totalUsers,
      totalPages,
      currentPage: page,
      pageSize,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
