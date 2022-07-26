import express from "express"

import { updateRoom, createRoom, deleteRoom, getAllRooms, getRoomById, updateRoomAvailability } from "../controller/room.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

// CREATE ROOM - admin
router.post("/:hotelId", verifyAdmin, createRoom)

// READ BY ID - everyone
router.get("/:id", getRoomById)

// READ ALL
router.get("/", getAllRooms)

// UPDATE ROOM
router.put("/:id", verifyAdmin, updateRoom)

router.put("/availability/:roomNumber", updateRoomAvailability)

// DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)



export default router