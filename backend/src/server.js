const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse form-data (optional)

const PORT = process.env.PORT || 5000 ;

app.listen(PORT,() => {
    console.log(`server running on the port : ${PORT}`);
    console.log("ENV TEST:", process.env.MONGO_URI);
}
    );