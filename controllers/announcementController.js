const Announcement = require("../models/Announcement");

// CREATE announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, createdBy } = req.body;

    const newAnnouncement = new Announcement({
      title,
      content,
      createdBy
    });

    await newAnnouncement.save();
    res.status(201).json({ msg: "Announcement created successfully", newAnnouncement });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE an announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Announcement not found" });
    res.json({ msg: "Announcement updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE an announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Announcement.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ msg: "Announcement not found" });
    res.json({ msg: "Announcement deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
