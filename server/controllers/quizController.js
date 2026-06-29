import Quiz from '../models/Quiz.js';
import Anthropic from '@anthropic-ai/sdk';



// @desc    Get all published quizzes
// @route   GET /api/quizzes/published
// @access  Private
const getPublishedQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ isPublished: true }).populate('createdBy', 'name');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get quiz by ID
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (quiz) {
            res.json(quiz);
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a quiz
// @route   POST /api/quizzes
// @access  Private/Admin
const createQuiz = async (req, res) => {
    const { title, description, timeLimit, questions } = req.body;
    
    try {
        const quiz = new Quiz({
            title,
            description,
            timeLimit,
            questions,
            createdBy: req.user._id,
        });

        const createdQuiz = await quiz.save();
        res.status(201).json(createdQuiz);
    } catch (error) {
        console.error('Create Quiz Error:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a quiz
// @route   PUT /api/quizzes/:id
// @access  Private/Admin
const updateQuiz = async (req, res) => {
    const { title, description, timeLimit, questions, isPublished } = req.body;

    try {
        const quiz = await Quiz.findById(req.params.id);

        if (quiz) {
            quiz.title = title || quiz.title;
            quiz.description = description || quiz.description;
            quiz.timeLimit = timeLimit || quiz.timeLimit;
            quiz.questions = questions || quiz.questions;
            quiz.isPublished = isPublished !== undefined ? isPublished : quiz.isPublished;

            const updatedQuiz = await quiz.save();
            res.json(updatedQuiz);
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a quiz
// @route   DELETE /api/quizzes/:id
// @access  Private/Admin
const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (quiz) {
            await quiz.deleteOne();
            res.json({ message: 'Quiz removed' });
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle publish status
// @route   PATCH /api/quizzes/:id/publish
// @access  Private/Admin
const togglePublish = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (quiz) {
            quiz.isPublished = !quiz.isPublished;
            const updatedQuiz = await quiz.save();
            res.json(updatedQuiz);
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    AI Generate Questions
// @route   POST /api/quizzes/ai-generate
// @access  Private/Admin
const generateAIQuestions = async (req, res) => {
    console.log("HEADERS:", req.headers)
    console.log("BODY:", req.body)
    const { topic } = req.body;
    if (!topic) {
        return res.status(400).json({ message: 'Topic is required' });
    }
    try {
        const apiKey = process.env.ANTHROPIC_API_KEY;

        // Agar real API key nahi hai, toh hum 'Mock AI' (Auto-Generator) use karenge
        if (!apiKey || apiKey === 'sk-ant-your-key-here' || apiKey === '') {
            console.log('Using Mock AI Generator because no valid API key is present.');

            // More dynamic mock generator to avoid repetitive answers
            const getDynamicOptions = (qTopic, type) => {
                const techTerms = ['Latency', 'Scalability', 'Framework', 'Concurrency', 'Asynchronous', 'Deployment', 'Optimization', 'Security', 'Architecture', 'Middleware'];
                const shuffledTerms = techTerms.sort(() => 0.5 - Math.random());
                
                if (type === 1) {
                    return {
                        options: [`Standard ${qTopic}`, `${shuffledTerms[0]} in ${qTopic}`, `${shuffledTerms[1]} management`, 'All of the above'],
                        correctAnswer: 'All of the above'
                    };
                }
                if (type === 2) {
                    return {
                        options: [`Legacy ${shuffledTerms[0]}`, `${shuffledTerms[1]} Integration`, `Modern ${qTopic} Stack`, `${shuffledTerms[2]} Protocols`],
                        correctAnswer: `Modern ${qTopic} Stack`
                    };
                }
                const correct = `${capitalizedTopic} ${shuffledTerms[0]}`;
                const opts = [correct, `${shuffledTerms[1]} Layer`, `${shuffledTerms[2]} Utility`, `Generic ${shuffledTerms[3]}`].sort(() => 0.5 - Math.random());
                return { options: opts, correctAnswer: correct };
            };

            const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
            const allMockQuestions = [
                {
                    question: `Which primary problem does ${topic} solve?`,
                    ...getDynamicOptions(capitalizedTopic, 1)
                },
                {
                    question: `What is the most common use case for ${topic}?`,
                    ...getDynamicOptions(capitalizedTopic, 2)
                },
                {
                    question: `Which of these is a key feature of ${topic}?`,
                    ...getDynamicOptions(capitalizedTopic, 3)
                },
                {
                    question: `How can ${topic} be best optimized?`,
                    ...getDynamicOptions(capitalizedTopic, Math.random() > 0.5 ? 1 : 2)
                },
                {
                    question: `Identify the main advantage of implementing ${topic}.`,
                    ...getDynamicOptions(capitalizedTopic, 3)
                },
                {
                    question: `What is the biggest challenge in ${topic} today?`,
                    ...getDynamicOptions(capitalizedTopic, 1)
                },
                {
                    question: `Which technology is often paired with ${topic}?`,
                    ...getDynamicOptions(capitalizedTopic, 2)
                }
            ];

            const shuffled = allMockQuestions.sort(() => 0.5 - Math.random());
            const selectedMockQuestions = shuffled.slice(0, 5);

            return res.json(selectedMockQuestions);
        }

        // Agar real key hai toh Anthropic API (Claude) chalega
        const anthropic = new Anthropic({
            apiKey: apiKey,
        });

        const prompt = `Generate exactly 5 multiple choice questions on the topic: ${topic}. Return a valid JSON array only, no explanation. Each item: { "question": string, "options": [string, string, string, string], "correctAnswer": string (must match one option exactly) }`;

        const msg = await anthropic.messages.create({
            model: "claude-3-sonnet-20240229",
            max_tokens: 2000,
            temperature: 0.7,
            messages: [{ role: "user", content: prompt }],
        });

        let content = msg.content[0].text;
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            content = jsonMatch[0];
        }

        const questions = JSON.parse(content);
        res.json(questions);
    } catch (error) {
        console.error('Claude API Error:', error);
        res.status(500).json({ message: 'Failed to generate questions with AI' });
    }
};

// @desc    AI Generate Options for a single question
// @route   POST /api/quizzes/ai-generate-options
// @access  Private/Admin
const generateSingleQuestionOptions = async (req, res) => {
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ message: 'Question is required' });
    }
    try {
        const apiKey = process.env.ANTHROPIC_API_KEY;

        if (!apiKey || apiKey === 'sk-ant-your-key-here' || apiKey === '') {
            console.log('Using Mock AI Generator because no valid API key is present.');
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Generate pseudo-random options based on the question text
            const words = question.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(w => w.length > 3);
            const keyword = words.length > 0 ? words[Math.floor(Math.random() * words.length)] : 'Option';
            const capitalizedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);

            return res.json({
                options: [`${capitalizedKeyword} Concept`, `Advanced ${capitalizedKeyword}`, `Basic ${capitalizedKeyword}`, `None of the above`],
                correctAnswer: `Advanced ${capitalizedKeyword}`
            });
        }

        const anthropic = new Anthropic({
            apiKey: apiKey,
        });

        const prompt = `Generate exactly 4 plausible multiple choice options and identify the correct answer for this question: "${question}". Return a valid JSON object only, no explanation. Format: { "options": [string, string, string, string], "correctAnswer": string (must match one option exactly) }`;

        const msg = await anthropic.messages.create({
            model: "claude-3-sonnet-20240229",
            max_tokens: 1000,
            temperature: 0.7,
            messages: [{ role: "user", content: prompt }],
        });

        let content = msg.content[0].text;
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            content = jsonMatch[0];
        }

        const data = JSON.parse(content);
        res.json(data);
    } catch (error) {
        console.error('Claude API Error:', error);
        res.status(500).json({ message: 'Failed to generate options with AI' });
    }
};

export {
    getPublishedQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    togglePublish,
    generateAIQuestions,
    generateSingleQuestionOptions,
};
