"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async (mongouri) => {
    try {
        await mongoose_1.default.connect(mongouri, { dbName: "Neina" });
        console.log("connected to mongoDB");
    }
    catch (error) {
        console.error("Error connecting to mongodb", error);
    }
};
exports.connectDB = connectDB;
