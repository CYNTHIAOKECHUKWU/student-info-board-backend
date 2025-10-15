const Register = require("../models/Register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// CREATE NEW REGISTRATION
exports.createRegistration = async (req, res) => {
  try {
    const { fullName, email, department, matricNumber, level, phone, project, password } = req.body;

    if (!fullName || !email || !matricNumber || !level || !project || !password) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const existing = await Register.findOne({ matricNumber, project });
    if (existing) {
      return res.status(400).json({ msg: "Student already registered for this project" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRegister = new Register({
      fullName,
      email,
      department,
      matricNumber,
      level,
      phone,
      project,
      password: hashedPassword
    });

    await newRegister.save();

    const { password: _p, ...safe } = newRegister.toObject();
    res.status(201).json({ msg: "Registration successful", student: safe });
  } catch (err) {
    console.error("Registration Error:", err);
    if (err.code === 11000) {
      return res.status(409).json({ msg: "Duplicate registration (matricNumber + project)" });
    }
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// LOGIN STUDENT
exports.loginStudent = async (req, res) => {
  try {
    const { email, password, project } = req.body;

    // Find student by email and project
    const student = await Register.findOne({ email, project });
    if (!student) return res.status(400).json({ msg: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign(
      { id: student._id, project: student.project },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _p, ...safeStudent } = student.toObject();
    res.json({ token, student: safeStudent });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// GET ALL STUDENTS
exports.getAllRegistrations = async (req, res) => {
  try {
    const students = await Register.find().sort({ createdAt: -1 }).select("-password");
    res.status(200).json(students);
  } catch (err) {
    console.error("Fetch Registrations Error:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
