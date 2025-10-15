// controllers/registerController.js
const Register = require("../models/Register");
const bcrypt = require("bcryptjs");

// Create a new registration
exports.createRegistration = async (req, res) => {
  try {
    const {
      fullName,
      email,
      department,
      matricNumber,
      level,
      phone,
      project,
      password
    } = req.body;

    // validate fields
    if (!fullName || !email || !matricNumber || !level || !project || !password) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // check for existing (matricNumber + project)
    const existing = await Register.findOne({ matricNumber, project });
    if (existing) {
      return res.status(400).json({ msg: "Student already registered for this project" });
    }

    // hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

    // Respond with safe subset (don't return hashed password)
    const { password: _p, ...safe } = newRegister.toObject();
    res.status(201).json({ msg: "Registration successful", student: safe });
  } catch (err) {
    console.error("Registration Error:", err);
    // If error is duplicate key from index, make message clearer
    if (err.code === 11000) {
      return res.status(409).json({ msg: "Duplicate registration (matricNumber + project)" });
    }
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get all registered students
exports.getAllRegistrations = async (req, res) => {
  try {
    const students = await Register.find().sort({ registeredAt: -1 }).select("-password");
    res.status(200).json(students);
  } catch (err) {
    console.error("Fetch Registrations Error:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
