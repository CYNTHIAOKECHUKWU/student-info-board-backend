const Event = require("../models/Event");

// ✅ Create Event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
      createdBy: req.user?.role === "admin" ? "Admin" : "User"
    });

    res.status(201).json({
      msg: "Event created successfully",
      newEvent
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // upcoming first
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
