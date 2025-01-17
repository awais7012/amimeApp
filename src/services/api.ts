import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const JIKAN_API = 'https://api.jikan.moe/v4';
const TMDB_API = 'https://api.themoviedb.org/3';

// Create axios instance for our API
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const register = (email: string, password: string) =>
  apiClient.post('/auth/register', { email, password });

export const login = (email: string, password: string) =>
  apiClient.post('/auth/login', { email, password });

// Anime API
export const getTopAnime = () =>
  axios.get(`${JIKAN_API}/top/anime`);

export const searchAnime = (query: string) =>
  axios.get(`${JIKAN_API}/anime`, { params: { q: query } });

// Movie API
export const getPopularMovies = () =>
  axios.get(`${TMDB_API}/movie/popular`, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY
    }
  });

export const searchMovies = (query: string) =>
  axios.get(`${TMDB_API}/search/movie`, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      query
    }
  });