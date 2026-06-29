import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import QuizListPage from './pages/QuizListPage';
import QuizTakePage from './pages/QuizTakePage';
import ScoreResultPage from './pages/ScoreResultPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import QuizCreatorPage from './pages/admin/QuizCreatorPage';
import QuizListAdmin from './pages/admin/QuizListAdmin';
import AttemptResultsPage from './pages/admin/AttemptResultsPage';
import UserRoute from './routes/UserRoute';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen font-sans bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/quizzes" element={<QuizListPage />} />

            {/* User Routes */}
            <Route element={<UserRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/quiz/:id" element={<QuizTakePage />} />
              <Route path="/result/:attemptId" element={<ScoreResultPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/create" element={<QuizCreatorPage />} />
              <Route path="/admin/quizzes" element={<QuizListAdmin />} />
              <Route path="/admin/results/:quizId" element={<AttemptResultsPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
