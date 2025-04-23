'use client';
import React, { useState, useEffect } from 'react';

const ResumePopup = ({ isOpen, onClose, resumeUrl }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md shadow-md w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex justify-end">
          <button className="text-gray-600 hover:text-gray-900" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <iframe src={resumeUrl} className="w-full h-96" />
        <a href={resumeUrl} download="resume.pdf">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4">
            Download Resume
          </button>
        </a>
      </div>
    </div>
  );
};

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  const resumeUrl = 'https://example.com/resume.pdf';

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <ResumePopup isOpen={isOpen} onClose={handleClose} resumeUrl={resumeUrl} />
    </div>
  );
};

export default Home;
