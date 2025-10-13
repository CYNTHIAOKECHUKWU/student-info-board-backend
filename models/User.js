const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "super"],
      default: "admin",
    },
    project: {
      type: String,
      required: true,
      trim: true, // allows any project name
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
