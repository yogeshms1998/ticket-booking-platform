const Booking = require("../models/Booking");
const Event = require("../models/Event");

// Book Ticket
exports.bookTicket = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.availableSeats < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    event.availableSeats -= quantity;
    await event.save();

    const booking = await Booking.create({
      userId: req.user.id,
      eventId,
      quantity,
      totalAmount: quantity * event.price,
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
    })
      .populate("eventId")
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const event = await Event.findById(
      booking.eventId
    );

    event.availableSeats += booking.quantity;
    await event.save();

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};