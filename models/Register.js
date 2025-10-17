const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  department: { type: String, required: true },
  matricNumber: { type: String, required: true, unique: true },
  level: { type: String, required: true },
  phone: { type: String },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Register", registerSchema);
