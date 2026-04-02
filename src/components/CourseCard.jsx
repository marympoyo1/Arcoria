import React from 'react';
import ProgressTracker from './ProgressTracker';
import { markCourseComplete, unmarkCourseComplete } from '../utils/firestoreHelpers';
import { auth } from '../firebaseConfig';

const CourseCard = ({
  title,
  level,
  description,
  onStart,
  progress = 0,
  isCompleted = false,
  onMarkComplete
}) => {
  const user = auth.currentUser;

  const handleCompleteToggle = () => {
    if (!user) {
      alert("You must be logged in to mark progress.");
      return;
    }

    if (isCompleted) {
      unmarkCourseComplete(user.uid, title);
      onMarkComplete(title, false);
    } else {
      markCourseComplete(user.uid, title);
      onMarkComplete(title, true);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded-lg shadow-md pt-8 pb-5 px-5 hover:shadow-lg transition border border-gray-200 relative min-h-[320px]">
      {/* Floating Badge */}
      {isCompleted && (
        <span className="absolute top-2 right-2 text-green-600 font-semibold text-xs bg-green-100 px-2 py-0.5 rounded shadow-sm">
          ✅ Completed
        </span>
      )}

      {/* Content Wrapper */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-green-600 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2 uppercase">{level}</p>
        <p className="text-gray-700 mb-4">{description}</p>
        <ProgressTracker progress={progress} />
      </div>

      {/* Button Row (stuck to bottom) */}
      <div className="flex gap-3 mt-auto">
        <button
          onClick={onStart}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Start
        </button>

        <button
          onClick={handleCompleteToggle}
          className={`px-4 py-2 rounded transition ${
            isCompleted
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-gray-200 text-green-800 hover:bg-green-300'
          }`}
        >
          {isCompleted ? 'Unmark as Complete' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;










