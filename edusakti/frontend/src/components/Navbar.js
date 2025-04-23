import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-elementary dark:text-primary-preschool">
                EduSakti
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/qa"
                className="text-gray-900 dark:text-gray-100 hover:text-primary-elementary px-3 py-2 rounded-md text-sm font-medium"
              >
                Ask Question
              </Link>
              <Link
                to="/"
                className="text-gray-900 dark:text-gray-100 hover:text-primary-elementary px-3 py-2 rounded-md text-sm font-medium"
              >
                Exam Simulation
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-elementary focus:outline-none"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
