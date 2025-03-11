require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { body, param, validationResult } = require("express-validator");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  rollNo: { type: Number, unique: true, required: true, min: 1 },
  studentId: { type: String, unique: true, required: true, minlength: 5 },
  age: { type: Number, required: true, min: 5, max: 100 },
  class: { type: String, required: true, minlength: 1, maxlength: 20 },
});

const Student = mongoose.model("Student", studentSchema);

// Middleware for validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// CREATE Student (POST)
app.post("/students",
  [
    body("name").isString().isLength({ min: 3, max: 50 }).withMessage("Name must be 3-50 characters long"),
    body("rollNo").isInt({ min: 1 }).withMessage("Roll No must be a positive integer"),
    body("studentId").isString().isLength({ min: 5 }).withMessage("Student ID must be at least 5 characters long"),
    body("age").isInt({ min: 5, max: 100 }).withMessage("Age must be between 5 and 100"),
    body("class").isString().isLength({ min: 1, max: 20 }).withMessage("Class must be 1-20 characters long"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const student = new Student(req.body);
      await student.save();
      res.status(201).json({ message: "Student created successfully", student });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  }
);

// READ Students (GET)
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// UPDATE Student (PUT)
app.put("/students/:id",
  [
    param("id").isMongoId().withMessage("Invalid student ID"),
    body("name").optional().isString().isLength({ min: 3, max: 50 }).withMessage("Name must be 3-50 characters long"),
    body("rollNo").optional().isInt({ min: 1 }).withMessage("Roll No must be a positive integer"),
    body("studentId").optional().isString().isLength({ min: 5 }).withMessage("Student ID must be at least 5 characters long"),
    body("age").optional().isInt({ min: 5, max: 100 }).withMessage("Age must be between 5 and 100"),
    body("class").optional().isString().isLength({ min: 1, max: 20 }).withMessage("Class must be 1-20 characters long"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (updateData.rollNo || updateData.studentId) {
        const existingStudent = await Student.findOne({
          $or: [{ rollNo: updateData.rollNo }, { studentId: updateData.studentId }],
          _id: { $ne: id },
        });

        if (existingStudent) {
          return res.status(400).json({ error: "rollNo or studentId already exists for another student" });
        }
      }

      const updatedStudent = await Student.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  }
);

// DELETE Student (DELETE)
app.delete("/students/:id",
  [param("id").isMongoId().withMessage("Invalid student ID")],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedStudent = await Student.findByIdAndDelete(id);

      if (!deletedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  }
);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
