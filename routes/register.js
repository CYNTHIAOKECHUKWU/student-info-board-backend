const express = require("express");
const { createRegistration, getAllRegistrations } = require("../controllers/registerController");

const router = express.Router();

router.post("/", createRegistration);
router.get("/", getAllRegistrations);

module.exports = router;
