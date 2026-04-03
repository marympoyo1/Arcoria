import React from 'react';

const AppToast = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed right-4 top-24 z-50 rounded-full border border-emerald-200 bg-white/95 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-[0_16px_40px_-22px_rgba(15,23,42,0.35)] backdrop-blur sm:right-6">
      {message}
    </div>
  );
};

export default AppToast;
