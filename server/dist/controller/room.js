var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Room from "../models/Rooms.js";
import Hotel from "../models/Hotels.js";
export const createRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        // try to save new Room
        const savedRoom = yield newRoom.save();
        try {
            // try to save Room in specific Hotel ID
            yield Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });
        }
        catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    }
    catch (err) {
        next(err);
    }
});
export const updateRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRoom = yield Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedRoom);
    }
    catch (err) {
        next(err);
    }
});
export const deleteRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hotelId = req.params.hotelId;
    try {
        yield Room.findByIdAndDelete(req.params.id);
        try {
            // $pull operator removes from an existing array all instances of a value
            yield Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
        }
        catch (err) {
            next(err);
        }
        res.status(200).json(`Deleted Room ${req.params.id} from Hotel ${req.params.id} successfully deleted`);
    }
    catch (err) {
        next(err);
    }
});
export const getRoomById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundRoom = yield Hotel.findById(req.params.id);
        res.status(200).json(foundRoom);
    }
    catch (err) {
        next(err);
    }
});
export const getAllRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRooms = yield Room.find();
        res.status(200).json(allRooms);
    }
    catch (err) {
        next(err);
    }
});
export const updateRoomAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Room.updateOne({ "roomNumbers._id": req.params.roomNumber }, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        });
        res.status(200).json("Room has been successfully booked");
    }
    catch (err) {
        next(err);
    }
});
