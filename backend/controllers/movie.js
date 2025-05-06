const Movies = require("../models/Movies");
const paginate = require("../utils/paging");
const fs = require("fs");
const path = require("path");

const genreFilePath = path.join(__dirname, "../data/genreList.json");
const genres = JSON.parse(fs.readFileSync(genreFilePath, "utf8"));
const videoFilePath = path.join(__dirname, "../data/videoList.json");
const videos = JSON.parse(fs.readFileSync(videoFilePath, "utf8"));

exports.getTrendingMovies = (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let movies = Movies.all();

  // Sắp xếp theo popularity giảm dần
  movies.sort((a, b) => b.popularity - a.popularity);

  const { results, totalPages } = paginate(movies, page);
  res.json({ results, page, totalPages });
};

exports.getTopRatedMovies = (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let movies = Movies.all();

  //Sắp xếp theo vote_average giảm dần
  movies.sort((a, b) => b.vote_average - a.vote_average);

  const { results, totalPages } = paginate(movies, page);
  res.json({ results, page, totalPages });
};
// Lấy movie theo genre
exports.getMovieByGenre = (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let genreId = parseInt(req.query.genre);

  if (!genreId) {
    return res.status(400).json({ message: "Không tìm thấy genre param" });
  }

  const genre = genres.find((g) => g.id === genreId);
  if (!genre) {
    return res.status(400).json({ message: "Không tìm thấy genre id" });
  }

  let movies = Movies.all().filter((movie) =>
    movie.genre_ids.includes(genreId)
  );

  const { results, totalPages } = paginate(movies, page);
  res.json({ results, page, totalPages });
};

exports.getMovieTrailer = (req, res) => {
  let filmId = req.body.film_id;
  if (!filmId) {
    return res.status(400).json({ message: "Not found film_id param" });
  }

  let movieVideos = videos.find((video) => video.id === filmId);
  if (!movieVideos) {
    return res.status(404).json({ message: "Not found video" });
  }

  let trailers = movieVideos.videos.filter(
    (v) =>
      (v.official && v.site === "Youtube" && v.type === "Trailer") ||
      v.type === "Teaser"
  );

  if (!trailers.length) {
    return res.status(404).json({ message: "Not found video" });
  }

  res.json(
    trailers.sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    )[0]
  );
};

exports.searchMovies = async (req, res) => {
  try {
    const { keyword, page = 1 } = req.body;

    if (!keyword) {
      return res.status(400).json({ message: "Not found keyword param" });
    }

    const skip = (page - 1) * limit;

    const movies = await Movies.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } }, //Tìm trong tiêu đề
        { overview: { $regex: keyword, $options: "i" } }, //Tìm trong mô tả
      ],
    })
      .skip(skip)
      .limit(limit);
    const totalMovies = await Movies.countDocuments({
      $or: [
        { title: { $regex: keyword, $options: "i" } }, //T
        { overview: { $regex: keyword, $options: "i" } }, //Tìm trong mô tả
      ],
    });
    res.status(200).json({
      results: movies,
      currentPage: page,
      totalPages: Math.ceil(totalMovies / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};
