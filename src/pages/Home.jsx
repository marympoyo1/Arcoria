import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/animation.json';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Main content */}
      <div className="flex-1 px-6 pt-24 pb-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-green-600 leading-tight">
            Welcome to <span className="text-gray-900">SkillForge</span>
          </h1>
          <p className="text-lg text-gray-600">
            Explore curated tech learning paths powered by YouTube. Build real-world skills and track your journey from beginner to pro.
          </p>
          <p className="glow-text text-lg font-semibold">
            💡 Learn smarter, not harder.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
            >
              Start Learning
            </button>
            <button
              onClick={() => navigate('/learn-more')}
              className="border border-green-500 text-green-600 px-6 py-3 rounded-lg hover:bg-green-100 transition"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="hidden md:block relative w-full max-w-md mx-auto">
          <div className="absolute -inset-4 bg-green-300 opacity-20 blur-2xl rounded-full animate-pulse z-0" />
          <div className="relative z-10">
            <Lottie animationData={animationData} loop className="w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-4 py-4 text-gray-600 text-xs sm:text-sm">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {/* Column 1: Brand */}
    <div>
      <h3 className="text-sm font-semibold text-gray-800 mb-1">SkillForge</h3>
      <p className="text-[11px] leading-relaxed">
        Empowering students to master tech skills through engaging,
        curated learning paths.
      </p>
    </div>

    {/* Column 2: Explore */}
    <div>
      <h3 className="text-sm font-semibold text-gray-800 mb-1">Explore</h3>
      <ul className="space-y-1 text-[11px]">
        <li><a href="/" className="hover:underline">Home</a></li>
        <li><a href="/login" className="hover:underline">Get Started</a></li>
        <li><a href="/learn-more" className="hover:underline">Learn More</a></li>
      </ul>
    </div>

    {/* Column 3: Resources */}
    <div>
      <h3 className="text-sm font-semibold text-gray-800 mb-1">Resources</h3>
      <ul className="space-y-1 text-[11px]">
        <li><a href="#" className="hover:underline">YouTube Tutorials</a></li>
        <li><a href="#" className="hover:underline">GitHub Projects</a></li>
        <li><a href="#" className="hover:underline">Community</a></li>
      </ul>
    </div>

    {/* Column 4: Contact Info */}
    <div>
      <h3 className="text-sm font-semibold text-gray-800 mb-1">Contact</h3>
      <ul className="space-y-1 text-[11px]">
        <li>Email: <a href="mailto:support@skillforge.com" className="hover:underline text-green-700">support@skillforge.com</a></li>
        <li>Phone: <span className="text-gray-700">+1 (555) 123-4567</span></li>
        <li>Address: <span className="text-gray-700">Houston, TX</span></li>
      </ul>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="mt-4 text-center text-[10px] text-gray-400">
    © 2025 SkillForge. All rights reserved.
  </div>
</footer>


         
      
    </div>
  );
};

export default Home;









