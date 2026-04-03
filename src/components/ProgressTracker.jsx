import React from 'react';

const ProgressTracker = ({ progress = 0 }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-emerald-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all"
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm font-medium text-slate-500">{clampedProgress}% complete</p>
    </div>
  );
};

export default ProgressTracker;
