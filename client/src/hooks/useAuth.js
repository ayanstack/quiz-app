import { useSelector, useDispatch } from 'react-redux';
import { setCredentials, logout, setLoading, setError } from '../store/slices/authSlice';
import authService from '../services/authService';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const loginUser = async (credentials) => {
    dispatch(setLoading(true));
    try {
      const data = await authService.login(credentials);
      dispatch(setCredentials(data));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      dispatch(setError(message));
      return { success: false, message };
    }
  };

  const registerUser = async (userData) => {
    dispatch(setLoading(true));
    try {
      const data = await authService.register(userData);
      dispatch(setCredentials(data));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      dispatch(setError(message));
      return { success: false, message };
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    loginUser,
    registerUser,
    logoutUser,
  };
};

export default useAuth;
