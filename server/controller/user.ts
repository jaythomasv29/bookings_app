import { Request, Response, NextFunction } from 'express'
import User from "../models/Users.js";

// Update User controller
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(`User ${req.params.id} successfully deleted`);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundUser = await User.findById(req, res, next);
    res.status(200).json(foundUser);
  } catch (err) {
    next(err);
  }
};
