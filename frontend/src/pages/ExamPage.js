import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ExamPage() {
  const { level, subject } = useParams();
  const [examSession, setExamSession] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startExam = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/exam/start`, {
          level,
          subject
        });
        setExamSession(response.data);
        setTimeLeft(response.data.time_limit);
      } catch (error) {
        console.error('Error starting exam:', error);
      }
      setLoading(false);
    };

    startExam();
  }, [level, subject]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/exam/submit`, {
        session_id: examSession.session_id,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          question_id: parseInt(questionId),
          answer
        }))
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-700 dark:text-gray-300">Loading exam...</div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Exam Results
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <p className="text-3xl font-bold text-primary-elementary">
              Score: {results.score}/{results.max_score}
            </p>
          </div>
          <div className="space-y-4">
            {results.feedback.map((item) => (
              <div
                key={item.question_id}
                className={`p-4 rounded-lg ${
                  item.correct
                    ? 'bg-green-50 dark:bg-green-900'
                    : 'bg-red-50 dark:bg-red-900'
                }`}
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {subject.charAt(0).toUpperCase() + subject.slice(1)} Exam
        </h1>
        <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="space-y-6">
        {examSession?.questions.map((question, index) => (
          <div
            key={question.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <p className="text-lg text-gray-900 dark:text-white mb-4">
              {index + 1}. {question.question}
            </p>
            <div className="space-y-2">
              {question.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={() => handleAnswerSelect(question.id, option)}
                    className="text-primary-elementary focus:ring-primary-elementary"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-elementary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-elementary"
      >
        Submit Exam
      </button>
    </div>
  );
}

export default ExamPage;
