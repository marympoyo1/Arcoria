// src/pages/LearnMore.jsx
import React from "react";


const LearnMore = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen flex flex-col justify-between px-6 py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-green-600 mb-4">Why SkillForge?</h1>
        <hr className="w-16 border-b-4 border-green-400 mx-auto mb-8" />
        <p className="text-gray-700 text-lg leading-relaxed mb-12">
          SkillForge is built for students who learn best by seeing and applying. We believe that visual learners thrive through hands-on,
          video-based experiences — not outdated slides or dense textbooks. That’s why every learning path we create is
          powered by curated YouTube tutorials designed to guide you from beginner to confident contributor. But we’re
          not just a playlist. SkillForge is your personal learning space — a clean, focused dashboard where your progress
          is tracked, your skills are organized, and everything you need is in one place. In a world of scattered bookmarks
          and chaotic notes, we make online learning feel structured and intentional. Whether you're diving into coding for
          the first time or leveling up your data skills, SkillForge helps you learn faster, stay organized, and stay motivated — all in one place.
        </p>

        {/* How It Works Section */}
        <div className="text-left max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">How It Works</h2>
          <div className="space-y-4 text-gray-800 text-lg">
            <p>🧠 <strong>Pick Your Skill:</strong> Choose from curated skill paths like Fullstack Development, Data Analytics, and more.</p>
            <p>📺 <strong>Watch & Learn:</strong> Access beginner-friendly YouTube tutorials — all in one organized space.</p>
            <p>📈 <strong>Track & Grow:</strong> Mark courses complete, see your progress, and stay focused.</p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default LearnMore;





