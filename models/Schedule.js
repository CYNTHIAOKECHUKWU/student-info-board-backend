const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    lecturer: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    time: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      default: "Admin",
    },
    project: {
      type: String,
      enum: ["STUDENT-INFO-WEBSITE", "CIT306-WEBSITE", "ANOTHER-GROUP-SITE"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
