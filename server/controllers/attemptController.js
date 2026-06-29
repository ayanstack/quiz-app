import Attempt from '../models/Attempt.js';
import Quiz from '../models/Quiz.js';

// @desc    Submit a quiz attempt
// @route   POST /api/attempts
// @access  Private
const submitAttempt = async (req, res) => {
    console.log('Submit Attempt Body:', JSON.stringify(req.body, null, 2));
    const { quizId, answers } = req.body;

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        let score = 0;
        const processedAnswers = answers.map((ans) => {
            const question = quiz.questions[ans.questionIndex];
            if (!question) {
                console.error(`Question not found for index ${ans.questionIndex}`);
                return {
                    ...ans,
                    isCorrect: false,
                };
            }
            const isCorrect = question.correctAnswer === ans.selected;
            if (isCorrect) score++;
            return {
                ...ans,
                isCorrect,
            };
        });

        const attempt = new Attempt({
            userId: req.user._id,
            quizId,
            score,
            totalQuestions: quiz.questions.length,
            answers: processedAnswers,
        });

        const createdAttempt = await attempt.save();
        res.status(201).json(createdAttempt);
    } catch (error) {
        console.error('Submit Attempt Error:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get my attempts
// @route   GET /api/attempts/my
// @access  Private
const getMyAttempts = async (req, res) => {
    try {
        const attempts = await Attempt.find({ userId: req.user._id })
            .populate('quizId', 'title')
            .sort({ completedAt: -1 });
        res.json(attempts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all attempts for a quiz (Admin)
// @route   GET /api/attempts/quiz/:quizId
// @access  Private/Admin
const getQuizAttempts = async (req, res) => {
    try {
        const attempts = await Attempt.find({ quizId: req.params.quizId })
            .populate('userId', 'name email')
            .sort({ completedAt: -1 });
        res.json(attempts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { submitAttempt, getMyAttempts, getQuizAttempts };
