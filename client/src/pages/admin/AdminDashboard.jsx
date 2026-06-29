import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  List, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  Users, 
  BookMarked,
  ArrowRight,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../services/axiosInstance';
import Spinner from '../../components/Spinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalQuizzes: 0, totalAttempts: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        // Mocking some aggregator calls since we don't have a single /stats endpoint yet
        const quizzes = await axiosInstance.get('/api/quizzes/published'); // Simplified
        const leaderboard = await axiosInstance.get('/api/leaderboard');
        setStats({
          totalQuizzes: quizzes.data.length,
          totalAttempts: leaderboard.data.reduce((acc, curr) => acc + curr.attempts, 0),
          totalUsers: leaderboard.data.length
        });
      } catch (error) {
        console.error('Failed to fetch admin stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  const adminActions = [
    { 
      title: 'Create New Quiz', 
      desc: 'Manually build or use AI to generate questions.', 
      icon: <PlusCircle className="w-6 h-6" />, 
      path: '/admin/create', 
      color: 'bg-indigo-600',
      label: 'AI Powered'
    },
    { 
      title: 'Manage Quizzes', 
      desc: 'Edit, delete, and publish/unpublish your quizzes.', 
      icon: <List className="w-6 h-6" />, 
      path: '/admin/quizzes', 
      color: 'bg-slate-800' 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center space-x-3 text-primary-600 font-bold mb-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="uppercase tracking-widest text-xs">Administrative Control Panel</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
              Admin <span className="text-primary-600">Dashboard</span>
            </h1>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: 'Published Content', value: stats.totalQuizzes, icon: <BookMarked />, sub: 'Active Quizzes' },
            { label: 'Total Engagement', value: stats.totalAttempts, icon: <BarChart3 />, sub: 'Attempts Made' },
            { label: 'Registered Users', value: stats.totalUsers, icon: <Users />, sub: 'Total Students' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon, { className: 'w-24 h-24' })}
              </div>
              <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">{item.label}</p>
              <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">{item.value}</div>
              <p className="text-xs font-bold text-primary-600">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Actions Grid */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 px-2">Quiz Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {adminActions.map((action, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 p-1 rounded-[2.5rem] shadow-xl shadow-indigo-600/5 group border border-slate-100 dark:border-slate-700"
            >
              <Link to={action.path} className="block p-8">
                <div className="flex justify-between items-start mb-10">
                  <div className={`${action.color} p-4 rounded-2xl text-white shadow-lg shadow-indigo-600/20`}>
                    {action.icon}
                  </div>
                  {action.label && (
                    <div className="bg-primary-50 text-primary-600 text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1.5 border border-primary-100">
                      <Cpu className="w-3 h-3" />
                      <span>{action.label}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-10">
                  {action.desc}
                </p>
                <div className="flex items-center space-x-2 text-primary-600 font-bold group-hover:translate-x-2 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Informational Banner */}
        <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 text-center lg:text-left">
               <h3 className="text-3xl font-black mb-4">Analyze Student Performance</h3>
               <p className="text-slate-400 max-w-lg leading-relaxed font-body">
                 Access detailed attempt logs to understand where students excel and where they struggle. Data-driven teaching starts here.
               </p>
            </div>
            <Link to="/admin/quizzes" className="bg-white text-slate-900 font-black py-4 px-10 rounded-2xl hover:bg-slate-100 transition-colors">
              Access All Data
            </Link>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-600/20 to-transparent pointer-events-none" />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
