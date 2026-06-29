import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BarChart3,
  User as UserIcon,
  Clock,
  TrendingUp,
  Download,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import attemptService from '../../services/attemptService';
import quizService from '../../services/quizService';
import Navbar from '../../components/Navbar';
import Spinner from '../../components/Spinner';

const AttemptResultsPage = () => {
  const { quizId } = useParams();
  const [attempts, setAttempts] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attemptsData, quizData] = await Promise.all([
          attemptService.getQuizAttempts(quizId),
          quizService.getQuizById(quizId)
        ]);
        setAttempts(attemptsData);
        setQuiz(quizData);
      } catch (error) {
        console.error('Failed to fetch results', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [quizId]);

  const avgScore = attempts.length > 0
    ? (attempts.reduce((acc, curr) => acc + curr.score, 0) / attempts.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 overflow-hidden">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/admin/quizzes" className="inline-flex items-center space-x-2 text-primary-600 font-bold mb-4 hover:text-primary-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Management</span>
            </Link>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
              Results: <span className="text-primary-600">{quiz?.title || 'Quiz'}</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Tracking performance for this specific evaluation.</p>
          </motion.div>

          <button className="hidden md:flex items-center space-x-2 bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm">
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>

        {loading ? (
          <div className="py-32 flex flex-col items-center">
            <Spinner size="lg" />
            <p className="mt-4 text-slate-500 dark:text-slate-400 font-bold">Aggregating student data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Summary Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Performance Summary</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 p-4 rounded-2xl">
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[10px]">Total Attempts</span>
                    <span className="text-2xl font-black text-slate-800 dark:text-white">{attempts.length}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 p-4 rounded-2xl">
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[10px]">Average Score</span>
                    <span className="text-2xl font-black text-primary-600">{avgScore}</span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/10">
                <BookOpen className="w-10 h-10 mb-6 opacity-20" />
                <h3 className="text-xl font-bold mb-2">Quiz Details</h3>
                <p className="text-indigo-200 text-sm font-medium leading-relaxed">
                  <strong>Time Limit:</strong> {quiz?.timeLimit} seconds<br />
                  <strong>Questions:</strong> {quiz?.questions.length}<br />
                  <strong>Status:</strong> {quiz?.isPublished ? 'Live' : 'Hidden'}
                </p>
              </div>
            </div>

            {/* Results Table */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-700/50">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Student</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">Score</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Progress</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                      {attempts.length > 0 ? (
                        attempts.map((attempt) => (
                          <tr key={attempt._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="px-6 py-6 whitespace-nowrap">
                              <div className="flex items-center space-x-3">
                                <div className="bg-slate-100 p-2 rounded-full">
                                  <UserIcon className="w-4 h-4 text-slate-500" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-bold text-slate-900 dark:text-white">{attempt.userId?.name}</span>
                                  <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider font-body">{attempt.userId?.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-center">
                              <span className="text-xl font-black text-primary-600">
                                {attempt.score} <span className="text-slate-300">/ {attempt.totalQuestions}</span>
                              </span>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                              <div className="flex items-center justify-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{new Date(attempt.completedAt).toLocaleDateString()}</span>
                              </div>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-right">
                              <div className="h-1.5 w-24 bg-slate-100 dark:bg-slate-700 rounded-full ml-auto overflow-hidden">
                                <div
                                  className="h-full bg-primary-600"
                                  style={{ width: `${(attempt.score / attempt.totalQuestions) * 100}%` }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="py-20 text-center text-slate-400 dark:text-slate-500 font-bold">
                            No attempts recorded for this quiz yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AttemptResultsPage;
