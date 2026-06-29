import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, Shield, UserPlus, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'user' 
  });
  const { registerUser, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md px-4"
      >
        <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 font-bold mb-8 hover:text-primary-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <h2 className="text-center text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Create <span className="text-primary-600">Account</span>
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary-600 hover:text-primary-500">
            Sign in here
          </Link>
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4"
      >
        <div className="bg-white dark:bg-slate-800 py-8 px-6 shadow-2xl shadow-indigo-600/5 sm:rounded-3xl sm:px-10 border border-slate-100 dark:border-slate-700">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3 rounded-xl flex items-center space-x-3 text-sm font-medium"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5 ml-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-600 rounded-2xl leading-5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition-all shadow-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-600 rounded-2xl leading-5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition-all shadow-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-600 rounded-2xl leading-5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5 ml-1">
                Account Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-600 rounded-2xl leading-5 bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition-all shadow-sm appearance-none"
                >
                  <option value="user">Student / Learner</option>
                  <option value="admin">Instructor / Admin</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 flex justify-center items-center space-x-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 font-black" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs text-center text-slate-500 dark:text-slate-400 font-medium px-4 leading-relaxed">
            By signing up, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
