const express = require("express");
const { createSchedule, getAllSchedules } = require("../controllers/scheduleController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Only admins can create schedules
router.post("/", protect, isAdmin, createSchedule);

// ✅ Anyone can view all schedules
router.get("/", getAllSchedules);

// (Optional) add update/delete later
// router.put("/:id", protect, isAdmin, updateSchedule);
// router.delete("/:id", protect, isAdmin, deleteSchedule);

module.exports = router;
