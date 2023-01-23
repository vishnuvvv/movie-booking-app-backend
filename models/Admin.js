import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: true,
  },
  addMovies: [
    {
      type: String,
    },
  ],
});

export default mongoose.model("Admin", adminSchema);
