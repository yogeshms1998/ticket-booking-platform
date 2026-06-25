const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
 {
    title: String,
    description: String,
    venue: String,
    date: Date,
    totalSeats: Number,
    availableSeats: Number,
    price: Number
 },
 {timestamps: true}
);

module.exports = mongoose.Model("Event",eventSchema);