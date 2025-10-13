const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  createdBy: {
    type: String, // later you can change this to ObjectId if linked to User model
    default: "Admin"
  }
}, { timestamps: true }); // adds createdAt & updatedAt automatically

module.exports = mongoose.model("Announcement", announcementSchema);
