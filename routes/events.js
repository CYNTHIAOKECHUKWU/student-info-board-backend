const express = require("express");
const { createEvent, getAllEvents } = require("../controllers/eventController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();

// ✅ Admins create events
router.post("/", protect, adminOnly, createEvent);

// ✅ Anyone can view events
router.get("/", getAllEvents);

module.exports = router;
