import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, CheckCircle, XCircle, Home, RotateCcw, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import axiosInstance from '../services/axiosInstance';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';

const ScoreResultPage = () => {
  const { attemptId } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        // We'll add an endpoint or fetch from my attempts and find this specific one
        // For now, let's assume we can GET /api/attempts/:id
        const response = await axiosInstance.get(`/api/attempts`);
        const found = response.data.find(a => a._id === attemptId);
        setAttempt(found);
      } catch (error) {
        console.error('Failed to fetch attempt', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttempt();
  }, [attemptId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Result Not Found</h2>
        <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
      </div>
    );
  }

  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl shadow-indigo-600/5 border border-slate-100 dark:border-slate-700 p-8 md:p-16 text-center mb-12"
        >
          <div className="inline-block p-6 rounded-full bg-primary-50 text-primary-600 mb-8">
            <Trophy className="w-16 h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Quiz Completed!</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">You've successfully finished the "{attempt.quizId?.title || 'Quiz'}".</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-3xl">
              <div className="text-sm font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-1">Score</div>
              <div className="text-4xl font-black text-primary-600">{attempt.score} / {attempt.totalQuestions}</div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-3xl">
              <div className="text-sm font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-1">Percentage</div>
              <div className="text-4xl font-black text-indigo-600">{percentage}%</div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-3xl">
              <div className="text-sm font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-1">Performance</div>
              <div className={`text-2xl font-black ${percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {percentage >= 90 ? 'Perfect!' : percentage >= 70 ? 'Good Job!' : 'Keep Practicing'}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/quizzes" className="btn-primary py-4 px-10 flex items-center space-x-2 w-full sm:w-auto">
              <RotateCcw className="w-5 h-5" />
              <span>Retry Quizzes</span>
            </Link>
            <Link to="/leaderboard" className="btn-outline py-4 px-10 flex items-center space-x-2 w-full sm:w-auto">
              <BarChart3 className="w-5 h-5" />
              <span>Leaderboard</span>
            </Link>
          </div>
        </motion.div>

        {/* Breakdown (Optional Feature) */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 px-4">Summary Breakdown</h2>
        <div className="space-y-4 px-4">
          {attempt.answers.map((answer, i) => (
            <div key={i} className={`p-6 rounded-3xl border-2 flex items-center justify-between ${answer.isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
               <div className="flex items-center space-x-4">
                  {answer.isCorrect ? (
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  ) : (
                    <XCircle className="w-8 h-8 text-rose-500" />
                  )}
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Question {answer.questionIndex + 1}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Your answer: <span className="font-bold">{answer.selected}</span></p>
                  </div>
               </div>
               <div className={`text-xs font-black uppercase px-3 py-1 rounded-full ${answer.isCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'}`}>
                 {answer.isCorrect ? 'Correct' : 'Incorrect'}
               </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ScoreResultPage;
