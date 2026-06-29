import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  BarChart3,
  Trophy,
  Cpu,
  ShieldCheck,
  Settings,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    { icon: <Zap className="w-6 h-6" />, title: 'Lightning Fast', desc: 'Timed quizzes that keep you sharp and focused.' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Instant Results', desc: 'Get scores and detailed corrections immediately.' },
    { icon: <Trophy className="w-6 h-6" />, title: 'Live Leaderboard', desc: 'Compete with the community and climb the ranks.' },
    { icon: <Cpu className="w-6 h-6" />, title: 'AI-Powered', desc: 'Auto-generate unique questions using Claude AI.' },
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'Secure Auth', desc: 'JWT-based authentication with role protection.' },
    { icon: <Settings className="w-6 h-6" />, title: 'Admin Control', desc: 'Full quiz management dashboard for creators.' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.08)_0%,transparent_50%)]" />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[10%] w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-40 -z-10"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-[5%] w-72 h-72 bg-violet-100 rounded-full blur-3xl opacity-40 -z-10"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
            >
              <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                The Ultimate Quiz Platform
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                Challenge Your Mind. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                  Prove Your Knowledge.
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0">
                Take timed quizzes, compete with others, and track your growth on the fastest-growing education platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="btn-primary py-4 px-10 text-lg w-full sm:w-auto text-center">
                  Get Started Free
                </Link>
                <Link to="/leaderboard" className="btn-outline py-4 px-10 text-lg w-full sm:w-auto text-center flex items-center justify-center space-x-2">
                  <span>View Leaderboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 p-4">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700"
                >
                  <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <div className="text-white/50 text-xs font-mono">quizhub.app</div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                        JS
                      </div>
                      <div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white">Modern JavaScript Quiz</div>
                        <div className="text-slate-500 dark:text-slate-400 text-sm">Timer: 02:00 • 10 Questions</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`p-4 rounded-xl border-2 ${i === 2 ? 'border-primary-600 bg-primary-50' : 'border-slate-100 flex items-center space-x-4'}`}>
                          <div className={`w-6 h-6 rounded-full border-2 ${i === 2 ? 'bg-primary-600 border-primary-600' : 'border-slate-300'}`} />
                          <div className={`h-4 rounded bg-slate-200 ${i === 2 ? 'w-3/4 bg-primary-200' : 'w-1/2'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-50 dark:border-slate-700 hidden md:block"
                >
                  <div className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Success Rate</div>
                  <div className="text-3xl font-black text-emerald-500">94.2%</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Features</h2>
            <p className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Everything you need to master topics.</p>
            <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-body">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-body">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 bg-white dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Three simple steps to start your learning journey.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-12">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your free account in seconds.' },
              { step: '02', title: 'Pick a Quiz', desc: 'Choose from hundreds of categories.' },
              { step: '03', title: 'See Your Score', desc: 'Get instant feedback and analysis.' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center relative max-w-xs">
                <div className="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center text-2xl font-black mb-8 shadow-xl shadow-indigo-600/20 rotate-12 hover:rotate-0 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden lg:block absolute top-10 -right-20 w-32 border-t-2 border-dashed border-indigo-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { label: 'Published Quizzes', value: '500+' },
              { label: 'Completed Attempts', value: '10,000+' },
              { label: 'Uptime Guarantee', value: '99.9%' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium uppercase tracking-widest text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-24 text-center text-white shadow-2xl shadow-indigo-600/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
              <Cpu className="w-32 h-32 text-indigo-500 opacity-20" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-6xl font-black mb-8">Ready to test yourself?</h2>
              <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto font-body">
                Join thousands of learners today. Complete quizzes, earn your spot on the leaderboard, and unlock your potential.
              </p>
              <Link to="/register" className="bg-white text-indigo-600 hover:bg-slate-50 font-black py-5 px-12 rounded-full text-xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                Create Free Account
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-12 lg:space-y-0">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="bg-primary-600 p-1.5 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Quiz<span className="text-primary-600">Hub</span>
                </span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                The world's leading platform for interactive knowledge testing and gamified learning.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6">Platform</h4>
                <ul className="space-y-4 text-slate-500">
                  <li><Link to="/quizzes" className="hover:text-primary-600">Browse Quizzes</Link></li>
                  <li><Link to="/leaderboard" className="hover:text-primary-600">Leaderboard</Link></li>
                  <li><Link to="/admin" className="hover:text-primary-600">Creator Panel</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6">Support</h4>
                <ul className="space-y-4 text-slate-500">
                  <li><a href="#" className="hover:text-primary-600">Help Center</a></li>
                  <li><a href="#" className="hover:text-primary-600">Community</a></li>
                  <li><a href="#" className="hover:text-primary-600">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-400 dark:text-slate-500 text-sm">
            <p>© 2026 QuizHub Pro. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0 font-body">
              <a href="#" className="hover:text-primary-600">Privacy Policy</a>
              <a href="#" className="hover:text-primary-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
