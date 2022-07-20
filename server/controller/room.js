import Room from "../models/Rooms.js";
import Hotel from "../models/Hotels.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    // try to save new Room
    const savedRoom = await newRoom.save();
    try {
      // try to save Room in specific Hotel ID
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      // $pull operator removes from an existing array all instances of a value
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      })
    } catch (err) {
      next(err)
    }
    res.status(200).json(`Deleted Room ${req.params.id} from Hotel ${req.params.id} successfully deleted`);

  } catch (err) {
    next(err);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const foundRoom = await Hotel.findById(req.params.id);
    res.status(200).json(foundRoomo);
  } catch (err) {
    next(err);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (err) {
    next(err);
  }
};
