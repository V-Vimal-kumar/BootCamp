require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  major: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true }
});

// Student Model
const Student = mongoose.model("Student", studentSchema);

// 📌 POST: Add a new student
app.post("/students", async (req, res) => {
  try {
    const { name, age, major, rollNo } = req.body;

    // Check for duplicate rollNo
    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({ error: "rollNo must be unique" });
    }

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

// 📌 GET: Retrieve all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from DB
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
