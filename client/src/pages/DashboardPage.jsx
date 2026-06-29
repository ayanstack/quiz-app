import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  History, 
  ChevronRight,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import attemptService from '../services/attemptService';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';

const DashboardPage = () => {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await attemptService.getMyAttempts();
        setAttempts(data);
      } catch (error) {
        console.error('Failed to fetch attempts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const totalScore = attempts.reduce((acc, curr) => acc + curr.score, 0);
  const avgScore = attempts.length > 0 ? (totalScore / attempts.length).toFixed(1) : 0;

  const stats = [
    { label: 'Total Attempts', value: attempts.length, icon: <History className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'Total Score', value: totalScore, icon: <Trophy className="w-5 h-5" />, color: 'bg-amber-500' },
    { label: 'Avg. Score', value: avgScore, icon: <TrendingUp className="w-5 h-5" />, color: 'bg-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
              Welcome back, <span className="text-primary-600">{user?.name}</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Here's a summary of your quiz performance.</p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-6"
            >
              <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Activity</h2>
              <Link to="/quizzes" className="text-primary-600 font-bold flex items-center space-x-1 hover:text-primary-700">
                <span>Browse Quizzes</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
              {loading ? (
                <div className="py-20"><Spinner /></div>
              ) : attempts.length > 0 ? (
                <div className="divide-y divide-slate-50 dark:divide-slate-700">
                  {attempts.slice(0, 5).map((attempt) => (
                    <div key={attempt._id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">{attempt.quizId?.title || 'Unknown Quiz'}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {new Date(attempt.completedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-primary-600">
                          {attempt.score} <span className="text-slate-300 font-bold ml-1">/ {attempt.totalQuestions}</span>
                        </div>
                        <div className="text-xs font-bold uppercase text-slate-400">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="bg-slate-50 dark:bg-slate-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <History className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No attempts yet</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8">Ready to test your knowledge?</p>
                  <Link to="/quizzes" className="btn-primary py-3 px-8">
                    Take your first quiz
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Practice Banner */}
          <div className="space-y-6">
             <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 bg-white/10 w-32 h-32 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-2xl font-black mb-4 relative z-10">Leaderboard Challenge</h3>
                <p className="text-indigo-100 mb-8 relative z-10 font-medium">
                  Users are competing for the top spot. Can you break into the top 10 this week?
                </p>
                <Link to="/leaderboard" className="bg-white text-indigo-600 font-black py-4 px-8 rounded-2xl flex items-center justify-center space-x-2 relative z-10 hover:shadow-lg transition-all active:scale-95">
                  <span>View Leaderboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
             </div>

             <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Tip</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Quizzes are timed! Always keep an eye on the countdown timer. Accuracy and speed both matter for your total ranking score.
                </p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
