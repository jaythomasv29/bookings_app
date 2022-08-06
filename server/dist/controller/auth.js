var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User(Object.assign(Object.assign({}, req.body), { password: hash }));
        yield newUser.save();
        res.status(201).send("User has been created");
    }
    catch (err) {
        next(err);
    }
});
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: req.body.username });
        if (!user)
            return next(createError(404, "User does not exist"));
        // Verify password
        const isPasswordCorrect = yield bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username"));
        const JWT_SECRET = process.env.JWT_SECRET || '';
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, JWT_SECRET);
        const _a = user._doc, { password, isAdmin } = _a, otherDetails = __rest(_a, ["password", "isAdmin"]);
        res
            .cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({ details: Object.assign(Object.assign({}, otherDetails), { isAdmin }) });
    }
    catch (err) {
        next(err);
    }
});
