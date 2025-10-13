const express = require("express");
const { createSchedule, getAllSchedules } = require("../controllers/scheduleController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Only admins can create schedules
router.post("/", protect, isAdmin, createSchedule);

// ✅ Everyone can view schedules
router.get("/", getAllSchedules);

module.exports = router;
