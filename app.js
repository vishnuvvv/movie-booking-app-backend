import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-route.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin",adminRouter)

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.lppoess.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log(
        "Connected to Database and server is running on Local host port:5000"
      )
    )
  )
  .catch((e) => console.log(e));
