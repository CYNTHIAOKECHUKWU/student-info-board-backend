const Schedule = require("../models/Schedule");

// ✅ Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    const { title, courseCode, lecturer, day, time, venue } = req.body;

    const newSchedule = await Schedule.create({
      title,
      courseCode,
      lecturer,
      day,
      time,
      venue,
      createdBy: "Admin",
    });

    res.status(201).json({
      msg: "Schedule created successfully",
      newSchedule,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ day: 1, time: 1 });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
