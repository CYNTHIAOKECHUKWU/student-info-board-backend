const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      default: "Admin"
    }
  },
  { strict: false, timestamps: true } // allows any extra fields
);

module.exports = mongoose.model("Announcement", announcementSchema);
