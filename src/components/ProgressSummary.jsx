// src/components/ProgressSummary.jsx
import React from 'react';

const ProgressSummary = ({ progressData }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-green-600 mb-4">Your Progress</h2>
      <ul className="space-y-2">
        {Object.entries(progressData).map(([skill, stats]) => (
          <li key={skill} className="flex justify-between items-center">
            <span className="text-gray-800 font-medium">{skill}</span>
            <span className="text-sm text-gray-600">{`${stats.completed} / ${stats.total} completed`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressSummary;
