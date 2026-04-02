// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-green-600 hover:text-green-700 transition-colors duration-200"
        >
          SkillForge
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/choose-skill"
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Choose Skill
              </Link>
              <button
                onClick={onLogout}
                className="text-sm bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-2 rounded border border-green-600 text-green-600 hover:bg-green-100 hover:border-green-700 hover:text-green-700 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/login"
                className="text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
















