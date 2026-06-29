import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Save, 
  Cpu, 
  Clock, 
  Type, 
  FileText,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import quizService from '../../services/quizService';
import claudeService from '../../services/claudeService';
import Navbar from '../../components/Navbar';
import Spinner from '../../components/Spinner';

const QuizCreatorPage = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    timeLimit: 300,
    questions: [],
  });
  const [aiTopic, setAiTopic] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [smartFillingIndices, setSmartFillingIndices] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuizData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        { question: '', options: ['', '', '', ''], correctAnswer: '', lastFilledQuestion: '' },
      ],
    }));
  };

  const handleRemoveQuestion = (index) => {
    const updated = [...quizData.questions];
    updated.splice(index, 1);
    setQuizData({ ...quizData, questions: updated });
  };

  const handleQuestionChange = (index, field, value) => {
    setQuizData(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };

      let newTitle = prev.title;
      let newDescription = prev.description;

      if (index === 0 && field === 'question' && value.length > 5) {
        if (!newTitle) {
          const topicMatch = value.match(/(?:is|about|for)\s+([^?.]+)/i) || [null, value.split(' ').slice(-1)[0]];
          const topic = topicMatch[1] ? topicMatch[1].trim() : 'New';
          newTitle = `${topic.charAt(0).toUpperCase() + topic.slice(1)} Quiz`;
        }
        if (!newDescription) {
          newDescription = `A quiz featuring questions about ${newTitle.replace(' Quiz', '')}.`;
        }
      }

      return {
        ...prev,
        questions: updatedQuestions,
        title: newTitle,
        description: newDescription
      };
    });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    setQuizData(prev => {
      const updatedQuestions = [...prev.questions];
      const updatedOptions = [...updatedQuestions[qIndex].options];
      updatedOptions[oIndex] = value;
      updatedQuestions[qIndex] = { ...updatedQuestions[qIndex], options: updatedOptions };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleSmartFill = async (index) => {
    const q = quizData.questions[index];
    if (!q.question || q.question.length < 5) return;
    
    // Safety check: if user has already typed some options, don't overwrite them automatically
    const filledOptionsCount = q.options.filter(opt => opt.trim() !== '').length;
    if (filledOptionsCount > 0 && q.lastFilledQuestion !== q.question) {
        // Only overwrite if it was completely empty OR if we already filled it for this exact question before
        if (q.lastFilledQuestion !== q.question) return;
    }

    if (q.lastFilledQuestion === q.question) return;

    setSmartFillingIndices(prev => [...prev, index]);
    try {
      const data = await claudeService.generateOptions(q.question);
      setQuizData(prev => {
        const updated = [...prev.questions];
        updated[index] = {
          ...updated[index],
          options: data.options,
          correctAnswer: data.correctAnswer,
          lastFilledQuestion: q.question // Track to avoid loops
        };
        return { ...prev, questions: updated };
      });
    } catch (error) {
      console.error('Smart fill failed:', error);
    } finally {
      setSmartFillingIndices(prev => prev.filter(i => i !== index));
    }
  };

  const handleAiGenerate = async () => {
    if (!aiTopic) return;
    setIsAiLoading(true);
    setMessage(null);
    try {
      const data = await claudeService.generateQuestions(aiTopic);
      const questionsArray = Array.isArray(data) ? data : (data.questions || []);
      
      // If title/description are empty, use AI suggested ones
      setQuizData({
        ...quizData,
        title: quizData.title || data.title || `${aiTopic} Quiz`,
        description: quizData.description || data.description || `Test your knowledge on ${aiTopic}`,
        questions: [...quizData.questions, ...questionsArray],
      });

      setMessage({ type: 'success', text: `Successfully generated 5 questions about ${aiTopic}!` });
      setAiTopic('');
    } catch (error) {
      setMessage({ type: 'error', text: 'AI Generation failed. Please try again.' });
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quizData.title.trim() || !quizData.description.trim()) {
      setMessage({ type: 'error', text: 'Please provide a Title and Description for the quiz.' });
      return;
    }

    if (quizData.questions.length === 0) {
      setMessage({ type: 'error', text: 'Please add at least one question.' });
      return;
    }

    // Check for empty fields in questions
    const hasEmptyFields = quizData.questions.some(q => 
      !q.question.trim() || 
      !q.correctAnswer.trim() || 
      q.options.some(opt => !opt.trim())
    );

    if (hasEmptyFields) {
      setMessage({ type: 'error', text: 'Please fill out all question fields and options completely.' });
      return;
    }

    // Simple validation for correct answers
    const invalid = quizData.questions.some(q => !q.options.includes(q.correctAnswer));
    if (invalid) {
      setMessage({ type: 'error', text: 'Each question must have a correct answer that matches one of the options.' });
      return;
    }

    setIsSaving(true);
    try {
      await quizService.createQuiz(quizData);
      setMessage({ type: 'success', text: 'Quiz saved successfully! Redirecting...' });
      setTimeout(() => {
        navigate('/admin/quizzes');
      }, 1500);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save quiz.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Quiz <span className="text-primary-600">Creator</span></h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium tracking-tight">Build knowledge, one question at a time.</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="btn-primary flex items-center space-x-2 py-3 px-8 shadow-xl shadow-primary-500/20"
          >
            {isSaving ? <Spinner size="sm" color="white" /> : <><Save className="w-5 h-5" /><span>Save Quiz</span></>}
          </button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-2xl flex items-center space-x-3 text-sm font-bold border ${
              message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{message.text}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* General Info */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-700 pb-4">General Settings</h3>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Type className="w-4 h-4 mr-2 text-primary-600" /> Quiz Title
                </label>
                <input
                  type="text"
                  value={quizData.title}
                  onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium"
                  placeholder="e.g., Advanced CSS Concepts"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-primary-600" /> Description
                </label>
                <textarea
                  value={quizData.description}
                  onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium min-h-[100px]"
                  placeholder="What is this quiz about?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary-600" /> Time Limit (seconds)
                </label>
                <input
                  type="number"
                  value={quizData.timeLimit}
                  onChange={(e) => setQuizData({ ...quizData, timeLimit: parseInt(e.target.value) })}
                  className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium"
                  min="30"
                />
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Questions</h3>
                <button
                  onClick={handleAddQuestion}
                  className="flex items-center space-x-2 text-primary-600 font-bold hover:bg-primary-50 px-4 py-2 rounded-xl transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Manual</span>
                </button>
              </div>

              <AnimatePresence>
                {quizData.questions.map((q, qIndex) => (
                  <motion.div
                    key={qIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 relative group"
                  >
                    <button
                      onClick={() => handleRemoveQuestion(qIndex)}
                      className="absolute top-6 right-6 text-slate-300 dark:text-slate-500 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="mb-6 relative">
                      <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-widest flex items-center">
                        Question {qIndex + 1}
                        {smartFillingIndices.includes(qIndex) && (
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="ml-3 flex items-center text-indigo-500 text-[10px] font-black tracking-tighter uppercase"
                          >
                            <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
                            AI Smart Filling...
                          </motion.span>
                        )}
                      </label>
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                        onBlur={() => handleSmartFill(qIndex)}
                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 border-none focus:ring-2 focus:ring-primary-500 font-bold text-lg"
                        placeholder="Type your question here..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-black text-xs uppercase">Option {String.fromCharCode(65 + oIndex)}</span>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            className="w-full pl-20 pr-4 py-3 rounded-xl border border-slate-100 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary-300 outline-none font-medium"
                            placeholder="..."
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Set Correct Answer</label>
                      <select
                        value={q.correctAnswer}
                        onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                        className="w-full px-5 py-3 rounded-xl border border-emerald-100 dark:border-emerald-800/30 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 font-bold outline-none appearance-none"
                      >
                        <option value="">Select Local Option...</option>
                        {q.options.filter(o => o.trim() !== '').map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {quizData.questions.length === 0 && (
                <div className="py-16 text-center border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-[3rem]">
                  <p className="text-slate-400 dark:text-slate-500 font-bold text-xl">No questions yet. Use AI or Add Manual.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - AI Tool */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-600/10 sticky top-32">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-indigo-500 rounded-2xl">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black">AI Generation</h3>
              </div>
              <p className="text-indigo-200 text-sm mb-8 font-medium leading-relaxed">
                Automatically generate 5 high-quality multiple choice questions using Claude AI. Just enter a topic.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-indigo-300 uppercase tracking-widest block mb-2 px-1">Topic</label>
                  <input
                    type="text"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white/10 rounded-2xl border border-white/10 text-white placeholder-white/30 outline-none focus:bg-white/20 transition-all font-body"
                    placeholder="e.g. React Hooks"
                  />
                </div>
                <button
                  onClick={handleAiGenerate}
                  disabled={isAiLoading || !aiTopic}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center space-x-2 font-black transition-all ${
                    isAiLoading || !aiTopic 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                  }`}
                >
                  {isAiLoading ? (
                    <Spinner size="sm" color="white" />
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate with AI</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-300">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <p className="text-xs text-indigo-300 font-medium leading-normal">
                  Generation takes 5-10 seconds. Questions are added directly to your list below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizCreatorPage;
