import mongoose from 'mongoose';

const quizSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        timeLimit: {
            type: Number,
            default: 5,
            required: false,// in seconds
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        questions: [
            {
                question: { type: String, required: true },
                options: [{ type: String, required: true }],
                correctAnswer: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
