// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://task-board-backend-seven.vercel.app/api' || 'http://localhost:3000/api',
//   withCredentials: true,
// });

// instance.interceptors.request.use((config) => {
//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default instance;

import axios from 'axios';

let baseURL;

if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;

  if (hostname === 'localhost') {
    baseURL = 'http://localhost:8000/api';
  } else {
    baseURL = 'https://taskboard-backend-jejb.onrender.com/api';
  }
}

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
