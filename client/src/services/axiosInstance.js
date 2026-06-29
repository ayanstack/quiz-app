import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_BASE_URL;
const baseURL = rawBaseURL.startsWith('http') || rawBaseURL.startsWith('/') ? rawBaseURL : `/${rawBaseURL}`;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
