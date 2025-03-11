require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://vimal:mongo@project.ldszj.mongodb.net/?retryWrites=true&w=majority&appName=project")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  major: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true }
});

// Create Student Model
const Student = mongoose.model("Student", studentSchema);

// POST: Add a new student
app.post("/students", async (req, res) => {
  try {
    const { name, age, major, rollNo } = req.body;

    // Check if rollNo is already taken
    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({ error: "rollNo must be unique" });
    }

    // Create new student
    const newStudent = new Student({ name, age, major, rollNo });
    await newStudent.save();

    res.status(201).json({
      message: "Student added successfully",
      studentId: newStudent._id
    });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
