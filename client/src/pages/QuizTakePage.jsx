import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Send, AlertCircle, XCircle, CheckCircle2, Sparkles } from 'lucide-react';
import useQuiz from '../hooks/useQuiz';
import CountdownTimer from '../components/CountdownTimer';
import QuestionCard from '../components/QuestionCard';
import Spinner from '../components/Spinner';

const QuizTakePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    activeQuiz,
    currentQuestionIndex,
    selectedAnswers,
    timeRemaining,
    quizStatus,
    loading,
    error,
    fetchAndStartQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    setQuestionIndex,
    tickTimer,
    finalizeQuiz,
    resetQuiz,
  } = useQuiz();

  const timerRef = useRef(null);
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', or null
  const [tempAnswer, setTempAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  useEffect(() => {
    fetchAndStartQuiz(id);
    return () => {
      clearInterval(timerRef.current);
      resetQuiz();
    };
  }, [id]);

  useEffect(() => {
    if (quizStatus === 'active' && !timerRef.current) {
      timerRef.current = setInterval(() => {
        tickTimer();
      }, 1000);
    }

    if (quizStatus === 'completed') {
      clearInterval(timerRef.current);
      handleSubmit();
    }

    return () => clearInterval(timerRef.current);
  }, [quizStatus]);

  const handleSubmit = async () => {
    if (loading || quizStatus === 'completed_navigated') return;
    
    const result = await finalizeQuiz();
    if (result.success) {
      navigate(`/result/${result.result._id}`);
    }
  };

  if (loading && !activeQuiz) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Error Loading Quiz</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <button onClick={() => navigate('/quizzes')} className="btn-primary w-full">
            Back to Quiz List
          </button>
        </div>
      </div>
    );
  }

  if (!activeQuiz) return null;

  const currentQuestion = activeQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === activeQuiz.questions.length - 1;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">{activeQuiz.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">{activeQuiz.description}</p>
          </div>
          <CountdownTimer seconds={timeRemaining} />
        </div>

        {/* Answer Feedback Popup */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-3 px-8 py-4 rounded-2xl shadow-2xl border ${
                feedback === 'correct' 
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
              }`}
            >
              {feedback === 'correct' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              <span className="font-black text-xl tracking-tight">
                {feedback === 'correct' ? 'Correct!' : 'Incorrect!'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-600/5 border border-slate-100 dark:border-slate-700 min-h-[500px] flex flex-col"
        >
          <QuestionCard
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedAnswer={tempAnswer || selectedAnswers[currentQuestionIndex]}
            onSelect={(selected) => {
              if (isAnswerChecked) return; // Prevent changing after checking
              setTempAnswer(selected);
            }}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={activeQuiz.questions.length}
            checked={isAnswerChecked}
            correctAnswer={currentQuestion.correctAnswer}
          />

          <div className="mt-8 flex justify-center">
            {!isAnswerChecked ? (
              <button
                onClick={() => {
                  if (!tempAnswer) return;
                  selectAnswer(currentQuestionIndex, tempAnswer);
                  setIsAnswerChecked(true);
                  if (tempAnswer === currentQuestion.correctAnswer) {
                    setFeedback('correct');
                  } else {
                    setFeedback('incorrect');
                  }
                  setTimeout(() => setFeedback(null), 2000);
                }}
                disabled={!tempAnswer}
                className={`flex items-center space-x-2 py-4 px-10 rounded-2xl font-black text-lg transition-all ${
                  !tempAnswer 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 hover:bg-indigo-500 hover:-translate-y-1'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                <span>Check Answer</span>
              </button>
            ) : (
              <div className={`flex items-center space-x-3 py-4 px-10 rounded-2xl font-black text-lg border-2 ${
                tempAnswer === currentQuestion.correctAnswer
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-rose-50 border-rose-200 text-rose-700'
              }`}>
                {tempAnswer === currentQuestion.correctAnswer ? (
                  <><CheckCircle2 className="w-6 h-6" /><span>Well Done!</span></>
                ) : (
                  <><XCircle className="w-6 h-6" /><span>Correct: {currentQuestion.correctAnswer}</span></>
                )}
              </div>
            )}
          </div>

          <div className="mt-auto pt-12 flex justify-between items-center">
            <button
              onClick={() => {
                prevQuestion();
                setIsAnswerChecked(false);
                setTempAnswer(null);
              }}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                currentQuestionIndex === 0
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex items-center space-x-2 py-3 px-8 text-lg"
              >
                {loading ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <>
                    <span>Submit Exam</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  nextQuestion();
                  setIsAnswerChecked(false);
                  setTempAnswer(null);
                }}
                className="btn-primary flex items-center space-x-2 py-3 px-8 text-lg"
              >
                <span>Next Question</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Question Navigator */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {activeQuiz.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setQuestionIndex(i);
                setIsAnswerChecked(false);
                setTempAnswer(null);
              }}
              className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                i === currentQuestionIndex
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 ring-4 ring-primary-100 dark:ring-primary-900/30'
                  : selectedAnswers[i]
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-200 dark:border-emerald-800/50'
                  : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-2 border-slate-100 dark:border-slate-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizTakePage;
