import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-route.js";
import movieRouter from "./routes/movie-route.js";
import bookingRouter from "./routes/booking-routes.js";
import cors from "cors"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);


const PORT = process.env.PORT
mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.lppoess.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Connected to Database and server is running on port:${PORT}`
      )
    )
  )
  .catch((e) => console.log(e));
