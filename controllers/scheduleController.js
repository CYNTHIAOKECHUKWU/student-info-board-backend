const Schedule = require("../models/Schedule");

// ✅ Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    const { title, courseCode, lecturer, day, time, venue } = req.body;

    // Automatically attach the admin’s project to the schedule
    const newSchedule = await Schedule.create({
      title,
      courseCode,
      lecturer,
      day,
      time,
      venue,
      project: req.user.project, // 👈 ensure it belongs to the admin’s project
      createdBy: req.user?.role === "admin" ? "Admin" : "User",
    });

    res.status(201).json({
      msg: "Schedule created successfully",
      newSchedule,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all schedules (for the logged-in user’s project only)
exports.getAllSchedules = async (req, res) => {
  try {
    // Only return schedules belonging to the same project
    const schedules = await Schedule.find({ project: req.user.project }).sort({
      day: 1,
      time: 1,
    });

    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
