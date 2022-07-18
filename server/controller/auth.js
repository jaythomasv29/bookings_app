import User from '../models/Users.js'
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({username, email, password});
    await newUser.save()
    req.status(201).send("User has been created")
  } catch (err) {
    next(err);
  }
};
