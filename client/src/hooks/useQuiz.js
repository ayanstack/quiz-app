import { useSelector, useDispatch } from 'react-redux';
import {
  startQuiz as startQuizAction,
  selectAnswer as selectAnswerAction,
  nextQuestion as nextQuestionAction,
  prevQuestion as prevQuestionAction,
  tickTimer as tickTimerAction,
  submitQuiz as submitQuizAction,
  resetQuiz as resetQuizAction,
  setLoading,
  setError,
} from '../store/slices/quizSlice';
import quizService from '../services/quizService';
import attemptService from '../services/attemptService';

const useQuiz = () => {
  const dispatch = useDispatch();
  const {
    activeQuiz,
    currentQuestionIndex,
    selectedAnswers,
    timeRemaining,
    quizStatus,
    loading,
    error,
  } = useSelector((state) => state.quiz);

  const fetchAndStartQuiz = async (id) => {
    dispatch(setLoading(true));
    try {
      const quiz = await quizService.getQuizById(id);
      dispatch(startQuizAction(quiz));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to start quiz';
      dispatch(setError(message));
      return { success: false, message };
    }
  };

  const selectAnswer = (questionIndex, selected) => {
    dispatch(selectAnswerAction({ questionIndex, selected }));
  };

  const nextQuestion = () => dispatch(nextQuestionAction());
  const prevQuestion = () => dispatch(prevQuestionAction());
  const tickTimer = () => dispatch(tickTimerAction());

  const finalizeQuiz = async () => {
    dispatch(setLoading(true));
    try {
      const answers = Object.keys(selectedAnswers).map((key) => ({
        questionIndex: parseInt(key),
        selected: selectedAnswers[key],
      }));

      const attemptData = {
        quizId: activeQuiz._id,
        answers,
      };

      const result = await attemptService.submitAttempt(attemptData);
      dispatch(submitQuizAction());
      return { success: true, result };
    } catch (err) {
      const message = err.response?.data?.message || 'Submission failed';
      dispatch(setError(message));
      return { success: false, message };
    }
  };

  const resetQuiz = () => dispatch(resetQuizAction());

  return {
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
    tickTimer,
    finalizeQuiz,
    resetQuiz,
  };
};

export default useQuiz;
