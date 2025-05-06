const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");
const auth = require("../middleware/auth");

router.get("/trending", movieController.getTrendingMovies);

router.get("/top-rate", movieController.getTopRatedMovies);

router.get("/discover", movieController.getMovieByGenre);

router.get("/video", movieController.getMovieTrailer);

router.post("/search", movieController.searchMovies);

router.use(auth);

module.exports = router;
