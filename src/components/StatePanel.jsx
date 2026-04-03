import React from 'react';

const toneClasses = {
  neutral: 'text-slate-500',
  error: 'text-rose-600',
};

const StatePanel = ({ message, tone = 'neutral', actionLabel, onAction }) => (
  <div className="section-shell p-8 text-center">
    <p className={`text-lg font-semibold ${toneClasses[tone] || toneClasses.neutral}`}>{message}</p>
    {actionLabel && onAction ? (
      <button onClick={onAction} className="btn-secondary mt-4">
        {actionLabel}
      </button>
    ) : null}
  </div>
);

export default StatePanel;
