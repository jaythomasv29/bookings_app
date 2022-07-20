import Hotel from "../models/Hotels.js";

// Create hotel controller
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
// Update hotel controller
export const updateHotel = async (req, res, next) => {
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

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Hotel ${req.params.id} successfully deleted`);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const allHotels = await Hotel.find();
    res.status(200).json(allHotels);
  } catch (err) {
    next(err);
  }
};

export const getHotelById = async (req, res, next) => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);
    res.status(200).json(foundHotel);
  } catch (err) {
    next(err);
  }
};

export const getCountByCity = async (req, res, next) => {
  // api/hotels/countByCity?cities=dallas,london,tokyo
  const cities = req.query.cities.split(",")
  try {
    const list = await Promise.all(cities.map(city => {
      console.log(city)
      return Hotel.countDocuments({city: city.toLowerCase()})
    }))
    res.json(list)
  } catch (err) {
    next(err)
  }
}
