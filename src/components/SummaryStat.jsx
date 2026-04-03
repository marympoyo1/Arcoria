import React from 'react';

const SummaryStat = ({ label, value }) => {
  return (
    <div className="rounded-[1.25rem] border border-emerald-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/80">{label}</p>
      <p className="mt-2 text-lg font-bold tracking-tight text-slate-900">{value}</p>
    </div>
  );
};

export default SummaryStat;
