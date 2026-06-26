const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// Public Routes
router.get("/events", getAllEvents);
router.get("/:id", getEventById);

// Admin Route
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createEvent
);

module.exports = router;