const Register = require("../models/Register");

// ✅ Create a new registration
exports.createRegistration = async (req, res) => {
  try {
    const { fullName, email, department, matricNumber, level, phone } = req.body;

    // Check if already registered
    const existing = await Register.findOne({ matricNumber });
    if (existing) {
      return res.status(400).json({ msg: "Student already registered" });
    }

    const newRegister = new Register({
      fullName,
      email,
      department,
      matricNumber,
      level,
      phone,
    });

    await newRegister.save();
    res.status(201).json({ msg: "Registration successful", newRegister });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all registered students
exports.getAllRegistrations = async (req, res) => {
  try {
    const students = await Register.find().sort({ registeredAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
