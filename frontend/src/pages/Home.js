import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [levels, setLevels] = useState({});

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get('http://localhost:8000/levels');
        setLevels(response.data.levels);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    fetchLevels();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
        Welcome to EduSakti
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {Object.entries(levels).map(([key, level]) => (
          <div
            key={key}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            style={{
              borderLeft: `4px solid ${level.ui_theme.primary_color}`
            }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {level.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Age Range: {level.age_range}
            </p>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Available Subjects:
              </h3>
              <div className="flex flex-wrap gap-2">
                {level.subjects.map((subject) => (
                  <Link
                    key={subject}
                    to={`/exam/${key}/${subject}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-elementary text-white hover:bg-opacity-90 transition-colors duration-200"
                  >
                    {subject}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
