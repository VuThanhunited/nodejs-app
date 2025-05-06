import React, { useState, useEffect } from "react";

import axios from "../../utils/axios";
import requests from "../../utils/requests";

import "./SearchResult.css";

const base_url = "http://image.tmdb.org/t/p/w500";

const SearchResult = ({ query }) => {
  const [movies, setMovies] = useState([]);

  const url = `${requests.fetchSearch}&query=${query}`;

  useEffect(() => {
    async function fetchData() {
      const token = "8qlOkxz4wq";
      const request = await axios.get(
        url,
        { keyword: "d:1" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovies(request.data.results);
      return request;
    }

    if (query) {
      fetchData();
    } else {
      setMovies([]);
    }
  }, [url, query]);

  return (
    <div className="row">
      <h2>Search Result</h2>
      <div className="row_posters search-result-container sc2">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              className={`row_poster row_posterLarge`}
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
