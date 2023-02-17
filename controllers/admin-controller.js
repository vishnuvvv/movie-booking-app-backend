import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

//##########################################################

export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json("Invalid inputs");
  }
/*
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingAdmin) {
    return res.status(400).json({ message: "admin already exists" });
  }
*/

  let admin;
  const hashedPassword = bcrypt.hashSync(password);

  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (error) {
    console.log(error);
  }

  if (!admin) {
    return res.status(500).json({ message: "Unable to store admin" });
  }
  return res.status(201).json({ message: "Admin created successfully", admin });
};

//##########################################################

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json("Invalid inputs");
  }

  let existingAdmin;

  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (error) {
    console.log(error);
  }

  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );


  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password!" });
  }

  const token = jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
    expiresIn:"7d"
  })



  return res.status(200).json({message: "Successfully logged into the admin account!",token, id:existingAdmin._id})
};

//##########################################################

export const getAllAdmins = async(req,res,next) =>{
  let existingAdmins;

  try {
    existingAdmins = await Admin.find()
  } catch (error) {
    return console.log(error);
  }

  if(!existingAdmins){
    return res.status(500).json({message : "Request faild"})
  }

  return res.status(200).json({existingAdmins})
}

