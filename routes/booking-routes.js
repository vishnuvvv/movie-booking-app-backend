import express from "express";
import {
  deleteBooking,
  getBookingById,
  newBooking,
} from "../controllers/booking-controller.js";

const bookingRouter = express.Router();

bookingRouter.get("/:id", getBookingById);
bookingRouter.post("/", newBooking);
bookingRouter.delete("/:id", deleteBooking);

export default bookingRouter;
