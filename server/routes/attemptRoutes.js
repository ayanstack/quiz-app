import express from 'express';
import { submitAttempt, getMyAttempts, getQuizAttempts } from '../controllers/attemptController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, submitAttempt)
    .get(protect, getMyAttempts);
router.get('/quiz/:quizId', protect, admin, getQuizAttempts);

export default router;