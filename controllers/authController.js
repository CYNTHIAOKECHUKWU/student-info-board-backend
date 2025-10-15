const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, project } = req.body;

    // 1️⃣ Check if user already exists within the same project
    const existingUser = await User.findOne({ email, project });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists in this project" });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create new user with project attached
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      project
    });

    res.status(201).json({
      msg: `${project} user registered successfully`,
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        project: user.project
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password, project } = req.body;

    // 1️⃣ Find user by email and project to avoid cross-login
    const user = await User.findOne({ email, project });
    if (!user) return res.status(400).json({ msg: "Invalid credentials or wrong project" });

    // 2️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    console.log("JWT_SECRET from env:", process.env.JWT_SECRET);


    // 3️⃣ Include project in token payload
    const token = jwt.sign(
      { id: user._id, role: user.role, project: user.project },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        project: user.project
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
