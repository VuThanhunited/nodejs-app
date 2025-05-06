import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/movies";

export const getTrendingMovies = async (page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/trending?page=${page}`);
  return response.data;
};

export const getTopRatedMovies = async (page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/top-rate?page=${page}`);
  return response.data;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await axios.get(
    `${API_BASE_URL}/discover?genre=${genreId}&page=${page}`
  );
  return response.data;
};

export const getMovieTrailer = async (page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/video?page=${page}`);
  return response.data;
};

export const searchMovies = async (keyword, filters = {}) => {
  const response = await axios.post(`${API_BASE_URL}/search`, {
    keyword,
    ...filters,
  });
  return response.data;
};
