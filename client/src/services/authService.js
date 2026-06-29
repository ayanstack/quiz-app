import axiosInstance from './axiosInstance';

const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
