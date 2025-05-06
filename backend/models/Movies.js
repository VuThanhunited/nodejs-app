const fs = require("fs");
const path = require("path");

// Đọc dữ liệu từ file
const movieFilePath = path.join(__dirname, "../data/movieList.json");

const Movies = {
  all: function () {
    return JSON.parse(fs.readFileSync(movieFilePath, "utf8"));
  },
};
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: String,
  overview: String,
  genre: [String],
  release_data: String,
  poster_path: String,
  vote_average: Number,
});

module.exports = mongoose.model("Movie", MovieSchema);
module.exports = Movies;
