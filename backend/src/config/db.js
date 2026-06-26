const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI is not set. Skipping database connection.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB database Connected Successfully");
  } catch (error) {
    console.error("MongoDB database Connection failed");
    console.error(error.message);
  }
};

module.exports = connectDB;