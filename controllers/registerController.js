const Register = require("../models/Register");

// ✅ Create a new registration
exports.createRegistration = async (req, res) => {
  try {
    const { fullName, email, department, matricNumber, level, phone } = req.body;

    // Validate required fields
    if (!fullName || !email || !department || !matricNumber || !level || !phone) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if already registered
    const existing = await Register.findOne({ matricNumber });
    if (existing) {
      return res.status(400).json({ msg: "Student with this matric number already registered" });
    }

    // Create new registration
    const newRegister = new Register({
      fullName,
      email,
      department,
      matricNumber,
      level,
      phone,
    });

    await newRegister.save();

    res.status(201).json({
      msg: "Registration successful",
      student: {
        fullName: newRegister.fullName,
        email: newRegister.email,
        matricNumber: newRegister.matricNumber,
        department: newRegister.department,
        level: newRegister.level,
        phone: newRegister.phone,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// ✅ Get all registered students
exports.getAllRegistrations = async (req, res) => {
  try {
    const students = await Register.find().sort({ registeredAt: -1 });
    res.status(200).json(students);
  } catch (err) {
    console.error("Fetch registrations error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};
