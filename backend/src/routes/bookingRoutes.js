const express = require("express");
const router = express.Router();

const {
  bookTicket,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

// Protected Routes
router.post("/", authMiddleware, bookTicket);

router.get(
  "/my-bookings",
  authMiddleware,
  getMyBookings
);

router.delete(
  "/:id",
  authMiddleware,
  cancelBooking
);

module.exports = router;