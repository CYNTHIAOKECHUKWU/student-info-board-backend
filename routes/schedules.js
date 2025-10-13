const express = require("express");
const { createSchedule, getAllSchedules } = require("../controllers/scheduleController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();

// ✅ Only admins can create schedules
router.post("/", protect, adminOnly, createSchedule);

// ✅ Everyone can view schedules
router.get("/", getAllSchedules);

module.exports = router;
