import express from 'express';
import {
    getPublishedQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    togglePublish,
    generateAIQuestions,
    generateSingleQuestionOptions,
} from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/published', getPublishedQuizzes);
router.post('/ai-generate', protect, admin, generateAIQuestions);
router.post('/ai-generate-options', protect, admin, generateSingleQuestionOptions);
router.route('/').post(protect, admin, createQuiz);
router.route('/:id')
    .get(protect, getQuizById)
    .put(protect, admin, updateQuiz)
    .delete(protect, admin, deleteQuiz);
router.patch('/:id/publish', protect, admin, togglePublish);

export default router;
