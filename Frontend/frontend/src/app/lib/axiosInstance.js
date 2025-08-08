import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://task-board-backend-seven.vercel.app/api' || 'http://localhost:3000/api',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;