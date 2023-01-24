import Movie from "../models/Movie";
import jwt from "jsonwebtoken";

export const addMovie = async (req, res, next) => {

  const extractedToken = req.headers.authorization.split(" ")[1];

  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found!" });
  }
  console.log(extractedToken);
  //1.first we need to verify the token the decrypt the token and find adminid

  let adminId;

  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400), json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //2. create movie and store admin id inside movieSchema from the decrypted token

  const { title, description, actors, releaseDate, posterUrl, featured } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      title,
      description,
      actors,
      releaseDate: new Date(`${releaseDate}`),
      posterUrl,
      featured,
      admin: adminId,
    });
    movie = await movie.save();
  } catch (error) {
    return console.log(error);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(201).json({ movie });
};
