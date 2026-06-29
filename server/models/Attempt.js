import mongoose from 'mongoose';

const attemptSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Quiz',
        },
        score: {
            type: Number,
            required: true,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
        answers: [
            {
                questionIndex: { type: Number, required: true },
                selected: { type: String, required: true },
                isCorrect: { type: Boolean, required: true },
            },
        ],
        completedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Attempt = mongoose.model('Attempt', attemptSchema);
export default Attempt;
