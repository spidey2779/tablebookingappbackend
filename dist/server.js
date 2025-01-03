"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./utils/database");
const bookings_1 = __importDefault(require("./routes/bookings"));
const tables_1 = __importDefault(require("./routes/tables"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.get("/", (req, res) => {
    res.send("server is running");
});
app.use("/api/bookings", bookings_1.default);
app.use("/api/tables", tables_1.default);
// Database Connection and Server Start
const startServer = async () => {
    try {
        await (0, database_1.connectDB)(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (error) {
        console.error("Failed to start server:", error);
    }
};
startServer();
