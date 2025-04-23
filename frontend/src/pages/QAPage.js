import React, { useState } from 'react';
import axios from 'axios';

function QAPage() {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('math');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const subjects = ['math', 'language', 'science'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/ask', {
        subject,
        question
      });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error asking question:', error);
      setAnswer('Sorry, there was an error processing your question.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
        Ask Your Question
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-elementary focus:ring-primary-elementary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub.charAt(0).toUpperCase() + sub.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-elementary focus:ring-primary-elementary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Type your question here..."
          />
        </div>

        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-elementary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-elementary disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Ask Question'}
        </button>
      </form>

      {answer && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Answer:
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default QAPage;
