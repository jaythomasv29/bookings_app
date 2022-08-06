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
import Hotel from "../models/Hotels.js";
import Room from "../models/Rooms.js";
// Create hotel controller
export const createHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = yield newHotel.save();
        res.status(200).json(savedHotel);
    }
    catch (err) {
        next(err);
    }
});
// Update hotel controller
export const updateHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedHotel = yield Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    }
    catch (err) {
        next(err);
    }
});
export const deleteHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(`Hotel ${req.params.id} successfully deleted`);
    }
    catch (err) {
        next(err);
    }
});
export const getHotels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.query, { min, max } = _a, others = __rest(_a, ["min", "max"]);
    //  /api/hotels/?featured=true
    try {
        const featuredHotels = yield Hotel.find(Object.assign(Object.assign({}, others), { cheapestPrice: { $gte: min || 1, $lte: max || 99999 } })).limit(req.query.limit);
        // const allHotels = await Hotel.find()
        res.status(200).json(featuredHotels);
    }
    catch (err) {
        next(err);
    }
});
export const getHotelById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundHotel = yield Hotel.findById(req.params.id);
        res.status(200).json(foundHotel);
    }
    catch (err) {
        next(err);
    }
});
export const getCountByCity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // api/hotels/countByCity?cities=dallas,london,tokyo
    const cities = req.query.cities.split(",");
    try {
        const list = yield Promise.all(cities.map((city) => {
            return Hotel.countDocuments({ city: city.toLowerCase() });
        }));
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
export const getCountByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const types = ["Hotel", "Apartment", "Resort", "Villa"];
    try {
        const list = yield Promise.all(types.map((type) => {
            return Hotel.countDocuments({ type: type });
        }));
        res.json(list.map((item, idx) => {
            return { propertyType: types[idx], count: item };
        }));
    }
    catch (err) {
        next(err);
    }
});
export const getHotelRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield Hotel.findById(req.params.hotelId);
        const list = yield Promise.all(hotel.rooms.map(room => {
            return Room.findById(room);
        }));
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
