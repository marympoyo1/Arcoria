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
    <div className="relative flex min-h-[340px] flex-col justify-between rounded-[1.5rem] border border-emerald-100/80 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.28)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(15,23,42,0.3)]">
      {isCompleted && (
        <span className="absolute right-4 top-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
          Completed
        </span>
      )}

      <div className="mb-6 space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{level}</p>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h3>
        </div>
        <p className="text-sm leading-7 text-slate-600">{description}</p>
        <ProgressTracker progress={progress} />
      </div>

      <div className="mt-auto flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onStart}
          className="btn-primary px-4 py-3"
        >
          Start Course
        </button>

        <button
          onClick={handleCompleteToggle}
          className={`inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition ${
            isCompleted
              ? 'border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
              : 'border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          {isCompleted ? 'Unmark as Complete' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
