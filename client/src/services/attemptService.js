import axiosInstance from './axiosInstance';

let baseUrl = "https://quiz-app1-kc9y.onrender.com/api"

const submitAttempt = async (attemptData) => {
  const response = await axiosInstance.post(baseUrl + '/attempts', attemptData);
  return response.data;
};

const getMyAttempts = async () => {
  const response = await axiosInstance.get('/attempts');
  return response.data;
};

const getQuizAttempts = async (quizId) => {
  const response = await axiosInstance.get(`/attempts/quiz/${quizId}`);
  return response.data;
};

const attemptService = {
  submitAttempt,
  getMyAttempts,
  getQuizAttempts,
};

export default attemptService;
