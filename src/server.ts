import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import { connectDB } from "./utils/database";
import bookingsRoutes from "./routes/bookings";
import tablesRoutes from "./routes/tables";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("server is running");
});
app.use("/api/bookings", bookingsRoutes);
app.use("/api/tables", tablesRoutes);

// Database Connection and Server Start
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
