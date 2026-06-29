import axiosInstance from './axiosInstance';

const getPublishedQuizzes = async () => {
  const response = await axiosInstance.get('/quizzes/published');
  return response.data;
};

const getQuizById = async (id) => {
  const response = await axiosInstance.get(`/quizzes/${id}`);
  return response.data;
};

const createQuiz = async (quizData) => {
  const response = await axiosInstance.post('/quizzes', quizData);
  return response.data;
};

const updateQuiz = async (id, quizData) => {
  const response = await axiosInstance.put(`/quizzes/${id}`, quizData);
  return response.data;
};

const deleteQuiz = async (id) => {
  const response = await axiosInstance.delete(`/quizzes/${id}`);
  return response.data;
};

const togglePublish = async (id) => {
  const response = await axiosInstance.patch(`/quizzes/${id}/publish`);
  return response.data;
};

const quizService = {
  getPublishedQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  togglePublish,
};

export default quizService;
