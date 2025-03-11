require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "your-default-uri-here";
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  major: String,
  rollNo: { type: String, unique: true },
});
const Student = mongoose.model("Student", studentSchema);

// POST: Add a Student
app.post("/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET: Retrieve All Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET: Retrieve Student by ID
app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: "Invalid Student ID" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});