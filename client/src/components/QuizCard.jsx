import React from 'react';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from './Badge';

const QuizCard = ({ quiz, onClick, isAdmin = false }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return mins > 0 ? `${mins}m` : `${seconds}s`;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full hover:shadow-xl hover:shadow-primary-600/5 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-primary-50 p-3 rounded-xl text-primary-600">
          <BookOpen className="w-6 h-6" />
        </div>
        {!isAdmin ? (
          <Badge variant="info">{quiz.questions.length} Questions</Badge>
        ) : (
          <Badge variant={quiz.isPublished ? 'published' : 'draft'}>
            {quiz.isPublished ? 'Published' : 'Draft'}
          </Badge>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">{quiz.title}</h3>
      <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-grow">
        {quiz.description || "Challenge yourself with this quiz and prove your knowledge in various topics."}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <div className="flex items-center space-x-2 text-slate-600 text-sm font-medium">
          <Clock className="w-4 h-4" />
          <span>{formatTime(quiz.timeLimit)}</span>
        </div>
        <button
          onClick={() => onClick(quiz)}
          className="flex items-center space-x-1 text-primary-600 font-bold hover:text-primary-700 transition-colors group"
        >
          <span>{isAdmin ? 'Manage' : 'Take Quiz'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default QuizCard;
