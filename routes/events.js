const express = require("express");
const { createEvent, getAllEvents } = require("../controllers/eventController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Admins create events
router.post("/", protect, isAdmin, createEvent);

// ✅ Anyone can view events
router.get("/", getAllEvents);

module.exports = router;
