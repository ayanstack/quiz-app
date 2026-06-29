import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import quizReducer from './slices/quizSlice';
import leaderboardReducer from './slices/leaderboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    leaderboard: leaderboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
