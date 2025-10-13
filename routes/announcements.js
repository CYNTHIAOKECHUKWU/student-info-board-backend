const express = require("express");
const {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement
} = require("../controllers/announcementController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/announcements
router.post("/", createAnnouncement);

// GET /api/announcements
router.get("/", getAnnouncements);

// PUT /api/announcements/:id
router.put("/:id", updateAnnouncement);

// DELETE /api/announcements/:id
router.delete("/:id", deleteAnnouncement);

module.exports = router; // ✅ this line is crucial
