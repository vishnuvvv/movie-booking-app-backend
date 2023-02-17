import User from "../models/User.js";
import Bookings from "../models/Bookings";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected error occured!" });
  }
  return res.status(200).json({ users });
};

////////////////////////////////////////////////////////////////////////

export const signup = async (req, res, next) => {
  
  //let existingEmail;

  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid credentials" });
  }
/*
  try {
    existingEmail = User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existingEmail) {
    return res.status(400).json({ message: "User already exists!" });
  }
*/
  const hashedPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = new User({
      name,
      email,
      password: hashedPassword,
    });
    user = await user.save();
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected error ocuured" });
  }
  return res.status(201).json({ id: user._id });
};

/////////////////////////////////////////////////////////////////

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Somethimg went wrong..!" });
  }

  let user;
  const hashedPassword = bcrypt.hashSync(password);

  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ message: "Updated succesfully" });
};

//####################################################################

export const deleteUser = async (req, res, next) => {
  let user;
  const id = req.params.id;

  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Something went wrong..!" });
  }

  return res.status(200).json({ message: "deleted succesfully!" });
};

//////////////////////////////////////////////////////////////////

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Something went wrong" });
  }

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find the user from this id..!" });
  }

  const isPasswordtrue = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordtrue) {
    return res.status(400).json({ message: "Invalid password" });
  }

  return res.status(200).json({ id : existingUser._id });
};

//####################################################################



export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;

  try {
    bookings = await Bookings.find({ user: id });
  } catch (error) {
    return console.log(error);
  }

  if (!bookings) {
    return res.status(500).json({ message: "Unable to get Bookings" });
  }

  return res.status(200).json({ bookings });
};
