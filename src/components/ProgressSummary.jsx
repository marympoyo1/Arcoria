import React from 'react';

const ProgressSummary = ({ progressData }) => {
  return (
    <div className="panel-card mb-6">
      <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">Your Progress</h2>
      <ul className="space-y-3">
        {Object.entries(progressData).map(([skill, stats]) => (
          <li key={skill} className="flex items-center justify-between rounded-2xl bg-emerald-50/70 px-4 py-3">
            <span className="font-medium text-slate-800">{skill}</span>
            <span className="text-sm text-slate-600">{`${stats.completed} / ${stats.total} completed`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressSummary;
