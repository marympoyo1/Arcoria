import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CourseDetail = () => {
  const location = useLocation();
  const course = location.state?.course;
  const navigate = useNavigate();

  if (!course) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-red-600">No course data provided.</h2>
        <p className="text-gray-700 mt-2">Please go back and select a course.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          ⬅️ Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-6 border border-gray-100">
      <h1 className="text-4xl font-bold text-green-600 mb-2">{course.title}</h1>
      <p className="text-sm text-gray-500 uppercase mb-4 tracking-wide">{course.level}</p>
      <p className="text-gray-800 leading-relaxed mb-6">{course.description}</p>

      {/* Embedded placeholder */}
      <div className="bg-green-50 border-2 border-dashed border-green-200 p-6 rounded-lg text-center mb-8">
        <p className="text-green-700 italic">🎥 Course video or content will go here</p>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          onClick={() => alert('Starting course...')}
        >
          🚀 Start Learning
        </button>

        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          ⬅️ Back to Learning Path
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;


