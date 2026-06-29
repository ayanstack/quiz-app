import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon, BookOpen, Sun, Moon } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Quizzes', path: '/quizzes' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];

  if (isAuthenticated && user?.role === 'admin') {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-1.5 rounded-lg shadow-lg shadow-primary-500/30">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Quiz<span className="text-primary-600">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-600'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* 🌙 Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              className="relative w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-yellow-400 shadow-inner hover:shadow-md transition-all duration-300"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                  <UserIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{user?.name}</span>
                </div>
                <button
                  onClick={logoutUser}
                  className="p-2 text-slate-500 hover:text-rose-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary py-2 px-5 text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.85 }}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-yellow-400 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span key="sun-m" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span key="moon-m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <button onClick={toggleMenu} className="text-slate-700 dark:text-slate-200 hover:text-primary-600 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600"
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-4">
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                    <UserIcon className="w-5 h-5" />
                    <span className="font-semibold">{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logoutUser();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 text-rose-600 font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-center font-semibold text-slate-700 dark:text-slate-300">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary text-center">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
