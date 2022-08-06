var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/Users.js";
// Update User controller
export const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        next(err);
    }
});
export const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User.findByIdAndDelete(req.params.id);
        res.status(200).json(`User ${req.params.id} successfully deleted`);
    }
    catch (err) {
        next(err);
    }
});
export const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield User.find();
        res.status(200).json(allUsers);
    }
    catch (err) {
        next(err);
    }
});
export const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield User.findById(req, res, next);
        res.status(200).json(foundUser);
    }
    catch (err) {
        next(err);
    }
});
