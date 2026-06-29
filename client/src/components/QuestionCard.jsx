import React from 'react';
import { motion } from 'framer-motion';

const QuestionCard = ({
  question,
  options,
  selectedAnswer,
  onSelect,
  questionNumber,
  totalQuestions,
  checked,
  correctAnswer
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-primary-600 uppercase tracking-wider">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="h-2 w-32 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            className="h-full bg-primary-600"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
        {question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const isSelected = selectedAnswer === option;
          const showSuccess = checked && isCorrect;
          const showError = checked && isSelected && !isCorrect;

          return (
            <motion.button
              key={index}
              whileHover={!checked ? { scale: 1.02 } : {}}
              whileTap={!checked ? { scale: 0.98 } : {}}
              onClick={() => onSelect(option)}
              disabled={checked}
              className={`p-5 text-left rounded-2xl border-2 transition-all duration-200 flex items-center space-x-4 ${
                showSuccess
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 ring-4 ring-emerald-100 dark:ring-emerald-900/30'
                  : showError
                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 ring-4 ring-rose-100 dark:ring-rose-900/30'
                  : isSelected
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30 ring-4 ring-primary-100 dark:ring-primary-900/30'
                  : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-slate-50 dark:hover:bg-slate-700'
              } ${checked && !isCorrect && !isSelected ? 'opacity-50 grayscale-[0.5]' : ''}`}
            >
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${
                  showSuccess
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : showError
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : isSelected
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-400 dark:text-slate-500'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span
                className={`text-lg font-medium ${
                  showSuccess ? 'text-emerald-900 dark:text-emerald-100' :
                  showError ? 'text-rose-900 dark:text-rose-100' :
                  isSelected ? 'text-primary-900 dark:text-primary-100' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {option}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
