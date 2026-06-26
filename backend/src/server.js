const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const app = require("./app");

dotenv.config({ path: path.join(__dirname, "../.env") });

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on the port : ${PORT}`);
  console.log("ENV TEST:", process.env.MONGO_URI);
});