import express from "express";

import { createError } from "../utils/error.js";
import { createHotel, updateHotel, deleteHotel, getHotelById, getHotels } from "../controller/hotel.js";
const router = express.Router();

// GET ALL HOTELS
router.get("/", getHotels);

// CREATE Hotel Route
router.post("/", createHotel);

// UPDATE BY ID
router.put("/:id", updateHotel);

// DELELTE BY ID
router.delete("/:id", deleteHotel);

// GET BY ID
router.get("/:id", getHotelById);



export default router;
