import express, { Request, Response } from "express";
import Booking from "../models/Booking";

const router = express.Router();

// Create a booking
router.post("/", async (req: Request, res: Response): Promise<any> => {
  const { tableId, userId, date, startTime, endTime, guests } = req.body;

  if (!tableId || !userId || !date || !startTime || !endTime || !guests) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for overlapping bookings for the table at the given time
    const overlappingBooking = await Booking.findOne({
      tableId,
      date,
      $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
    });

    if (overlappingBooking) {
      return res
        .status(400)
        .json({ message: "Table already booked for the selected time range" });
    }

    // Create and save the booking
    const booking = new Booking({
      tableId,
      userId,
      date,
      startTime,
      endTime,
      guests,
    });
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: (error as Error).message });
  }
});
//get all bookings
router.get("/", async (req: Request, res: Response) => {

  try {
    // Fetch bookings for the given date
    const bookings = await Booking.find();
    // Send the daily bookings
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Delete a booking
router.post("/deletebooking", async (req: Request, res: Response) => {
  const { userId, guests, startTime, endTime, date, tableId } = req.body;
  if (!userId || !guests || !startTime || !endTime || !tableId || !date) {
    res.status(404).json({ message: "invalid booking" });
    return;
  }
  try {
    await Booking.deleteOne({ ...req.body });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Get user-specific bookings
router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate(
      "tableId"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Get bookings for a specific day
router.get("/:date", async (req: Request, res: Response) => {
  const { date } = req.params;

  try {
    // Fetch bookings for the given date
    const bookings = await Booking.find({ date });

    // Send the daily bookings
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
