import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import movieTrailer from "movie-trailer";
import MovieDetail from "../../components/browse/MovieDetail";
import "./MovieList.css";

const img_url = "http://image.tmdb.org/t/p/w500";
const movies_limit = 10;

function MovieList({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const token = "8qlOkxz4wq";
      const request = await axios.get(fetchUrl, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
      });
      setMovies(request.data.results);
      console.log(request.data);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
      setTrailerUrl("");
    } else {
      setSelectedMovie(movie);
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  movies.sort((a, b) => b.popularity - a.popularity);
  movies.splice(movies_limit);

  return (
    <div className="row">
      <h2 className="movie-list-title">{title}</h2>
      <div className="row_posters sc2">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${img_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      <div style={{ padding: "40px" }}>
        {selectedMovie && (
          <MovieDetail movieData={selectedMovie} movieTrailer={trailerUrl} />
        )}
      </div>
    </div>
  );
}

export default MovieList;
