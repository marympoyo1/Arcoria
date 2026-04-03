import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/70 bg-white/82 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between py-4">
        <Link
          to={isLoggedIn ? "/dashboard" : "/"}
          className="text-lg font-semibold tracking-tight text-slate-950 hover:text-emerald-800"
        >
          Arcoria
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-slate-900"
              >
                Dashboard
              </Link>
              <Link
                to="/choose-skill"
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-slate-900"
              >
                Choose Skill
              </Link>
              <button
                onClick={onLogout}
                className="btn-primary px-4 py-2.5 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex btn-muted px-4 py-2.5 text-sm"
              >
                Login
              </Link>
              <Link
                to="/login"
                className="btn-primary px-4 py-2.5 text-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
