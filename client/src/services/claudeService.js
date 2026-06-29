import axiosInstance from './axiosInstance';

const generateQuestions = async (topic) => {
  const response = await axiosInstance.post('/quizzes/ai-generate', { topic });
  return response.data;
};

const generateOptions = async (question) => {
  const response = await axiosInstance.post('/quizzes/ai-generate-options', { question });
  return response.data;
};

const claudeService = {
  generateQuestions,
  generateOptions,
};

export default claudeService;
