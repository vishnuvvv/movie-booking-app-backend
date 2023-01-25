import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  actors: [{ type: String, required: true }],

  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },

  admin: {
    type: String,
    required: true,
  },
  bookings: [{ type: String }],

});


export default mongoose.model("Movie", movieSchema);
