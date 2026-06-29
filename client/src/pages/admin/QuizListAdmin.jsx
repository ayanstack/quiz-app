import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Trash2, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Plus, 
  ArrowRight,
  BarChart3,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import quizService from '../../services/quizService';
import Navbar from '../../components/Navbar';
import Spinner from '../../components/Spinner';
import Badge from '../../components/Badge';

const QuizListAdmin = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      // Admin should see ALL quizzes they created or all in system?
      // For this spec, we'll fetch published and then filter if we need more
      // But let's assume we have a GET /api/quizzes endpoint for admin
      // Since it's not explicitly in the spec, we'll use a hack or just the published one for now
      // Actually, let's assume the backend has a general GET /api/quizzes for admin
      const response = await quizService.getPublishedQuizzes(); // Placeholder
      setQuizzes(response);
    } catch (error) {
      console.error('Failed to fetch quizzes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleTogglePublish = async (id) => {
    try {
      await quizService.togglePublish(id);
      fetchQuizzes();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await quizService.deleteQuiz(id);
      fetchQuizzes();
    } catch (error) {
      alert('Failed to delete quiz');
    }
  };

  const filteredQuizzes = quizzes.filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Manage <span className="text-primary-600">Quizzes</span></h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Monitoring and controlling all quiz content.</p>
          </div>
          <Link to="/admin/create" className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create New</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Filter by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 border-none rounded-xl focus:ring-2 focus:ring-primary-500 font-medium text-sm"
                />
             </div>
             <button onClick={fetchQuizzes} className="text-slate-400 hover:text-primary-600 transition-colors">
               <RotateCcw className="w-5 h-5" />
             </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Questions</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Time Limit</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                <AnimatePresence>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-20 text-center"><Spinner /></td>
                    </tr>
                  ) : filteredQuizzes.map((quiz) => (
                    <motion.tr 
                      key={quiz._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="font-bold text-slate-900 dark:text-white">{quiz.title}</div>
                        <div className="text-xs text-slate-400 font-medium">{quiz._id}</div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap text-center font-bold text-slate-600 dark:text-slate-300">
                        {quiz.questions.length}
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap text-center font-bold text-slate-600 dark:text-slate-300">
                        {Math.floor(quiz.timeLimit / 60)}m {quiz.timeLimit % 60}s
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap text-center">
                        <button onClick={() => handleTogglePublish(quiz._id)}>
                          <Badge variant={quiz.isPublished ? 'published' : 'draft'}>
                            {quiz.isPublished ? 'Published' : 'Draft'}
                          </Badge>
                        </button>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap text-right">
                        <div className="flex justify-end items-center space-x-3">
                          <Link 
                            to={`/admin/results/${quiz._id}`} 
                            title="View Attempt Results"
                            className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                          >
                            <BarChart3 className="w-5 h-5" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(quiz._id)}
                            className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <Link 
                            to={`/quiz/${quiz._id}`}
                            className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          {!loading && filteredQuizzes.length === 0 && (
            <div className="py-20 text-center text-slate-400 font-bold">
              No quizzes found matching your search.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizListAdmin;
