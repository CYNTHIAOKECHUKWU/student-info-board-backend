const express = require("express");
const {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

const { protect, isAdmin } = require("../middleware/authMiddleware"); // ✅ import properly

const router = express.Router();

// ✅ Only logged-in admins can create announcements
router.post("/", protect, isAdmin, createAnnouncement);

// ✅ Everyone (logged in or not) can read announcements
router.get("/", getAnnouncements);

// ✅ Only admins can update announcements
router.put("/:id", protect, isAdmin, updateAnnouncement);

// ✅ Only admins can delete announcements
router.delete("/:id", protect, isAdmin, deleteAnnouncement);

module.exports = router;
