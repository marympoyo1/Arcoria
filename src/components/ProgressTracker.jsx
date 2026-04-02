import React from 'react';

const ProgressTracker = ({ progress = 0 }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 transition-all"
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-1">{clampedProgress}% complete</p>
    </div>
  );
};

export default ProgressTracker;

