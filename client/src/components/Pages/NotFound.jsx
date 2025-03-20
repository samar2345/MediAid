import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <FaExclamationTriangle className="mx-auto text-yellow-500 text-6xl mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            <FaHome className="mr-2" />
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 