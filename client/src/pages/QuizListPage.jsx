import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, BookOpen, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import quizService from '../services/quizService';
import Navbar from '../components/Navbar';
import QuizCard from '../components/QuizCard';
import Spinner from '../components/Spinner';

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await quizService.getPublishedQuizzes();
        setQuizzes(data);
      } catch (err) {
        setError('Failed to load quizzes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTakeQuiz = (quiz) => {
    navigate(`/quiz/${quiz._id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Available Quizzes</h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Choose a topic and start your challenge.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-32 flex flex-col items-center">
            <Spinner size="lg" />
            <p className="mt-4 text-slate-500 dark:text-slate-400 font-bold animate-pulse">Loading amazing quizzes...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-100 text-rose-700 p-8 rounded-3xl text-center max-w-2xl mx-auto">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
            <p className="font-medium">{error}</p>
          </div>
        ) : filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredQuizzes.map((quiz, i) => (
              <QuizCard 
                key={quiz._id} 
                quiz={quiz} 
                onClick={handleTakeQuiz} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-sm px-4">
            <div className="bg-slate-50 dark:bg-slate-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No quizzes found</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Try a different search term or check back later.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizListPage;
