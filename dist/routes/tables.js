"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Table_1 = __importDefault(require("../models/Table"));
const router = express_1.default.Router();
// Get all tables
router.get("/", async (_req, res) => {
    try {
        const tables = await Table_1.default.find();
        res.status(200).json(tables);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route to insert multiple tables
router.post('/insert', async (req, res) => {
    try {
        const tablesData = req.body; // Expecting an array of table objects
        // Validate if the request body is an array of tables
        if (!Array.isArray(tablesData)) {
            return res.status(400).json({ message: 'Request body must be an array of tables' });
        }
        // Insert multiple tables at once
        const insertedTables = await Table_1.default.insertMany(tablesData);
        res.status(201).json({
            message: 'Tables inserted successfully',
            tables: insertedTables,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error inserting tables', error: err.message });
    }
});
exports.default = router;
