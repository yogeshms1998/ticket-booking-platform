const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());

app.use(cors());

//app.use(helmet());

app.use(morgan("dev"));

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

// Health Check

app.get("/", (req, res) => {

 res.json({

   success: true,

   message:
     "Ticket Booking Platform API Running"

 });

});

module.exports = app;



