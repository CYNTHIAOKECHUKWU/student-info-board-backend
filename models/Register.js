// models/Register.js
const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  department: {
    type: String,
    trim: true,
    default: ""
  },
  matricNumber: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    default: ""
  },
  project: {
    type: String,
    required: true,
    enum: ["STUDENT-INFO-WEBSITE", "CIT306-WEBSITE", "ANOTHER-GROUP-SITE"]
  },
  // if you prefer not to store passwords here, remove this field
  password: {
    type: String,
    required: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// create a compound unique index for matricNumber+project to prevent duplicate registrations per project
registerSchema.index({ matricNumber: 1, project: 1 }, { unique: true });

module.exports = mongoose.model("Register", registerSchema);
