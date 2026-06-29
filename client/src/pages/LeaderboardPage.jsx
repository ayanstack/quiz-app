import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trophy, TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchLeaderboard } from '../store/slices/leaderboardSlice';
import Navbar from '../components/Navbar';
import LeaderboardTable from '../components/LeaderboardTable';
import Spinner from '../components/Spinner';

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const { scores, loading, error } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block p-3 rounded-2xl bg-amber-50 text-amber-500 mb-6 border border-amber-100">
              <Trophy className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4">Hall of <span className="text-primary-600">Fame</span></h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              See who's dominating the charts. Scores are aggregated from all quiz attempts.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Main Table */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="py-32"><Spinner size="lg" /></div>
            ) : error ? (
              <div className="bg-rose-50 border border-rose-100 text-rose-700 p-8 rounded-3xl text-center">
                <h3 className="text-xl font-bold mb-2">Error loading leaderboard</h3>
                <p>{error}</p>
              </div>
            ) : (
              <LeaderboardTable scores={scores} />
            )}
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
               <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">How to Rank?</h3>
               </div>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                  Ranks are calculated based on your <strong>Total Points</strong> earned across all quizzes. Every correct answer counts!
               </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-900/20">
               <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 rounded-xl bg-white/10 text-white">
                    <Info className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Pro Tip</h3>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Check out the "Admin" section to see if you can create your own quizzes and challenge the community!
               </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;
