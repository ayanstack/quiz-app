import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quiz from './models/Quiz.js';
import User from './models/User.js';

dotenv.config();

const seedQuiz = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Find an admin user to be the creator, or create one
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            admin = await User.create({
                name: 'System Admin',
                email: 'admin@quizhub.com',
                password: 'password123',
                role: 'admin'
            });
        }

        const quiz = new Quiz({
            title: 'JavaScript Basics Quiz',
            description: 'Test your knowledge of JavaScript fundamentals!',
            timeLimit: 15,
            isPublished: true,
            createdBy: admin._id,
            questions: [
                {
                    question: 'Which company developed JavaScript?',
                    options: ['Microsoft', 'Netscape', 'Oracle', 'Sun Microsystems'],
                    correctAnswer: 'Netscape'
                },
                {
                    question: 'Which symbol is used for strict equality comparison in JS?',
                    options: ['=', '==', '===', '!='],
                    correctAnswer: '==='
                },
                {
                    question: 'How do you declare a variable that cannot be reassigned?',
                    options: ['var', 'let', 'const', 'static'],
                    correctAnswer: 'const'
                },
                {
                    question: 'What is the correct syntax for a single-line comment in JavaScript?',
                    options: ['<!-- comment -->', '/* comment */', '// comment', '# comment'],
                    correctAnswer: '// comment'
                },
                 {
                    question: 'Which method adds one or more elements to the end of an array?',
                    options: ['push()', 'pop()', 'shift()', 'unshift()'],
                    correctAnswer: 'push()'
                }
            ]
        });

        await quiz.save();
        console.log('Sample Quiz created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding quiz:', error);
        process.exit(1);
    }
};

seedQuiz();
