import axios, { AxiosInstance } from 'axios';

export const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
