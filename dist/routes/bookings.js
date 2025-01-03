"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Booking_1 = __importDefault(require("../models/Booking"));
const router = express_1.default.Router();
// Create a booking
router.post("/", async (req, res) => {
    const { tableId, userId, date, startTime, endTime, guests } = req.body;
    if (!tableId || !userId || !date || !startTime || !endTime || !guests) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Check for overlapping bookings for the table at the given time
        const overlappingBooking = await Booking_1.default.findOne({
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
        const booking = new Booking_1.default({
            tableId,
            userId,
            date,
            startTime,
            endTime,
            guests,
        });
        await booking.save();
        res.status(201).json(booking);
    }
    catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: error.message });
    }
});
//get all bookings
router.get("/", async (req, res) => {
    try {
        // Fetch bookings for the given date
        const bookings = await Booking_1.default.find();
        // Send the daily bookings
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Delete a booking
router.post("/deletebooking", async (req, res) => {
    const { userId, guests, startTime, endTime, date, tableId } = req.body;
    if (!userId || !guests || !startTime || !endTime || !tableId || !date) {
        res.status(404).json({ message: "invalid booking" });
        return;
    }
    try {
        await Booking_1.default.deleteOne({ ...req.body });
        res.status(200).json({ message: "Booking deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get user-specific bookings
router.get("/user/:userId", async (req, res) => {
    try {
        const bookings = await Booking_1.default.find({ userId: req.params.userId }).populate("tableId");
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get bookings for a specific day
router.get("/:date", async (req, res) => {
    const { date } = req.params;
    try {
        // Fetch bookings for the given date
        const bookings = await Booking_1.default.find({ date });
        // Send the daily bookings
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
