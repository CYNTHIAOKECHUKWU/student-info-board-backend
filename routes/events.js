const express = require("express");
const { createEvent, getAllEvents } = require("../controllers/eventController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Admins can create new events
router.post("/", protect, isAdmin, createEvent);

// ✅ Anyone (logged in or not) can view all events
router.get("/", getAllEvents);

// (Optional) Future endpoints for updating or deleting events
// router.put("/:id", protect, isAdmin, updateEvent);
// router.delete("/:id", protect, isAdmin, deleteEvent);

module.exports = router;
