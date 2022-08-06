var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cors from 'cors';
const PORT = 5000;
const app = express();
dotenv.config();
// Initial MongoDB connection
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnectionString = process.env.MONGO_CONNECT || '';
    try {
        yield mongoose.connect(mongoConnectionString);
        console.log('connected');
    }
    catch (err) {
        console.log("error connecting to db");
        throw err;
    }
});
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
});
// Routes
app.get("/", (req, res) => {
    res.send("Live on root");
});
// Middlewares
// cookieParser
app.use(cookieParser());
app.use(cors());
/// parse json
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});
app.listen(PORT, () => {
    connect();
    console.log('app listening on port ' + PORT);
});
