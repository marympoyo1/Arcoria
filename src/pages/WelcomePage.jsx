import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Welcome to SkillForge! 
      </h1>
      <p className="text-lg text-gray-700 max-w-xl mb-6">
        You’ve successfully signed in. From here, you can explore your dashboard, start a new learning path, or continue where you left off.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => navigate("/choose-skill")}
          className="border border-green-600 text-green-700 px-6 py-2 rounded hover:bg-green-100 transition"
        >
          Choose a Skill
        </button>
      </div>

      {/* 💡 Progress Tip */}
      <p className="text-sm text-gray-600 mt-6">
        💡 <span className="font-medium">Tip:</span> Head to your dashboard to continue a course or mark one complete!
      </p>
    </div>
  );
};

export default Welcome;


