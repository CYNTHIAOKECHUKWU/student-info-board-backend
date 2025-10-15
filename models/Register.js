// models/Register.js
const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
      default: "",
    },
    matricNumber: {
      type: String,
      required: [true, "Matric number is required"],
      trim: true,
    },
    level: {
      type: String,
      required: [true, "Level is required"],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    project: {
      type: String,
      required: [true, "Project name is required"],
      enum: ["STUDENT-INFO-WEBSITE", "CIT306-WEBSITE", "ANOTHER-GROUP-SITE"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be at least 5 characters long"],
      select: false, // hides password from query results by default
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ✅ Compound unique index to prevent duplicate (matricNumber + project)
registerSchema.index({ matricNumber: 1, project: 1 }, { unique: true });

module.exports = mongoose.model("Register", registerSchema);
