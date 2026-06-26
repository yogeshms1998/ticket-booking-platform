const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
} = require("../controllers/eventController");

const {
  protect,
} = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// Public Routes
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Admin Route
router.post(
  "/",
  protect,
  roleMiddleware("admin"),
  createEvent
);

module.exports = router;