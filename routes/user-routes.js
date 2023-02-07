import {
  deleteUser,
  getAllUsers,
  getBookingsOfUser,
  login,
  signup,
  updateUser,
} from "../controllers/user-controllers.js";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login",login)
userRouter.get("/bookings/:id",getBookingsOfUser)


export default userRouter;
