import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeQuiz: null,
  currentQuestionIndex: 0,
  selectedAnswers: {},
  timeRemaining: 0,
  quizStatus: 'idle', // idle, active, completed
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz: (state, action) => {
      state.activeQuiz = action.payload;
      state.currentQuestionIndex = 0;
      state.selectedAnswers = {};
      state.timeRemaining = 120; // Forced to 120 seconds (2 minutes)
      state.quizStatus = 'active';
      state.loading = false;
    },
    selectAnswer: (state, action) => {
      const { questionIndex, selected } = action.payload;
      state.selectedAnswers[questionIndex] = selected;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.activeQuiz.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    tickTimer: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      } else {
        state.quizStatus = 'completed';
      }
    },
    submitQuiz: (state) => {
      state.quizStatus = 'completed';
    },
    resetQuiz: (state) => {
      state.activeQuiz = null;
      state.currentQuestionIndex = 0;
      state.selectedAnswers = {};
      state.timeRemaining = 0;
      state.quizStatus = 'idle';
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  startQuiz,
  selectAnswer,
  nextQuestion,
  prevQuestion,
  tickTimer,
  submitQuiz,
  resetQuiz,
  setLoading,
  setError,
} = quizSlice.actions;
export default quizSlice.reducer;
