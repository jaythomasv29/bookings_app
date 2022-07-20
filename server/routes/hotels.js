import express from "express";


import { createHotel, updateHotel, deleteHotel, getHotelById, getHotels, getCountByCity } from "../controller/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();



// CREATE Hotel Route
router.post("/", verifyAdmin, createHotel);

// UPDATE BY ID
router.put("/:id", verifyAdmin, updateHotel);

// DELELTE BY ID
router.delete("/:id", verifyAdmin, deleteHotel);

// GET ALL HOTELS
router.get("/", getHotels);

// GET BY ID
router.get("/find/:id", getHotelById);

// GET Count by different cities
router.get("/countByCity", getCountByCity)

// GET BY TYPE
// router.get("/countByType", getHotels)



export default router;
