require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Define Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: { type: Number, unique: true },
  studentId: { type: String, unique: true },
  age: Number,
  class: String,
});

const Student = mongoose.model("Student", studentSchema);

// ✅ POST - Create a New Student
app.post("/students", async (req, res) => {
  try {
    const { name, rollNo, studentId, age, class: studentClass } = req.body;

    // Check if rollNo or studentId already exists
    const existingStudent = await Student.findOne({ $or: [{ rollNo }, { studentId }] });

    if (existingStudent) {
      return res.status(400).json({ error: "Student with this rollNo or studentId already exists" });
    }

    const newStudent = new Student({ name, rollNo, studentId, age, class: studentClass });
    await newStudent.save();

    res.status(201).json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// ✅ GET - Retrieve All Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// ✅ GET - Retrieve a Single Student by ID
app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// ✅ PUT - Update Student by ID
app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rollNo, studentId, ...updateData } = req.body;

    let updateFields = { ...updateData };

    if (rollNo || studentId) {
      const existingStudent = await Student.findOne({
        $or: [{ rollNo }, { studentId }],
        _id: { $ne: id },
      });

      if (existingStudent) {
        return res.status(400).json({
          error: "Conflict: rollNo or studentId already exists for another student.",
        });
      }

      if (rollNo) updateFields.rollNo = rollNo;
      if (studentId) updateFields.studentId = studentId;
    }

    // Update the student record
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// ✅ DELETE - Remove a Student by ID
app.delete("/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
