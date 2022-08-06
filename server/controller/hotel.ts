import { Request, Response, NextFunction} from 'express'
import Hotel from "../models/Hotels.js";
import Room from "../models/Rooms.js"

// Create hotel controller
export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
// Update hotel controller
export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Hotel ${req.params.id} successfully deleted`);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req: Request, res: Response, next: NextFunction) => {
  const { min, max, ...others } = req.query;
  //  /api/hotels/?featured=true
  try {
    const featuredHotels = await Hotel.find({
      ...others,
      cheapestPrice: {$gte: min || 1, $lte: max || 99999}
    }).limit(req.query.limit);
    // const allHotels = await Hotel.find()

    res.status(200).json(featuredHotels);
  } catch (err) {
    next(err);
  }
};

export const getHotelById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);
    res.status(200).json(foundHotel);
  } catch (err) {
    next(err);
  }
};

export const getCountByCity = async (req: Request, res: Response, next: NextFunction) => {
  // api/hotels/countByCity?cities=dallas,london,tokyo
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city.toLowerCase() });
      })
    );
    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const getCountByType = async (req: Request, res: Response, next: NextFunction) => {
  const types = ["Hotel", "Apartment", "Resort", "Villa"];
  try {
    const list = await Promise.all(
      types.map((type) => {
        return Hotel.countDocuments({ type: type });
      })
    );
    res.json(
      list.map((item, idx) => {
        return { propertyType: types[idx], count: item };
      })
    );
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId)
    const list = await Promise.all(hotel.rooms.map(room => {
      return Room.findById(room)
    }))
    res.json(list)
  } catch (err) {
    next(err)
  }
}