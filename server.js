const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*", // later you can restrict to your frontend URLs
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Student Info Board Backend is running 🚀");
});

// API routes
/*app.use("/api/register", require("./routes/register")) */
app.use("/api/announcements", require("./routes/announcements"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/schedules", require("./routes/schedules"));

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
