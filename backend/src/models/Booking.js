const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
   {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    quantity: Number,
    totalAmount: Number,
    bookingStatus: {
        type: String,
        default: "Confirmed"
    }
   },
   {timestamps: true}
);

module.exports = mongoose.model("Booking",bookingSchema);