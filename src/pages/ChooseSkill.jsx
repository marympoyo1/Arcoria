import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseSkill = () => {
  const navigate = useNavigate();

  const skillCategories = {
    Development: ['Fullstack Development', 'Mobile Development', 'Web Development'],
    'Data & Analysis': ['Data Analyst', 'Data Engineer', 'Data Science'],
    Design: ['UI/UX Design', 'Product Design'],
    Security: ['Cybersecurity', 'Security Engineer'],
    'Career & Soft Skills': ['Career & Soft Skills'],
  };

  const categoryIcons = {
    Development: '🔨',
    'Data & Analysis': '📊',
    Design: '🎨',
    Security: '🔐',
    'Career & Soft Skills': '💼',
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Go Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-8 inline-block bg-white text-green-600 border border-green-300 px-4 py-2 rounded hover:bg-green-50 transition"
        >
          ← Go Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4 drop-shadow-sm">
            Choose a Skill to Explore
          </h1>
          <p className="text-gray-700 text-lg mb-12">
            Select a focus area to unlock curated learning paths and start leveling up your tech skills.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="space-y-12">
          {Object.entries(skillCategories).map(([category, skills], index) => (
            <div key={category}>
              {index !== 0 && <div className="border-t border-gray-300 mb-8"></div>}

              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{categoryIcons[category]}</span>
                <h2 className="text-2xl font-semibold text-green-700">{category}</h2>
              </div>

              <div className="flex flex-wrap gap-4">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => navigate(`/learning-paths?skill=${encodeURIComponent(skill)}`)}
                    className="bg-green-200 text-green-800 font-medium px-5 py-2 rounded-lg transition hover:bg-green-300"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseSkill;






