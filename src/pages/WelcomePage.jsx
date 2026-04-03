import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="page-gradient flex min-h-screen items-center py-12">
      <div className="page-shell">
        <div className="section-shell mx-auto max-w-4xl p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
            <div className="space-y-5 text-center lg:text-left">
              <p className="eyebrow">You're In!</p>
              <h1 className="app-heading">
                Welcome to Arcoria.
              </h1>
              <p className="app-subheading max-w-2xl">
                You're signed in and ready to keep building.
              </p>
              <p className="app-body max-w-2xl">
                Jump into your dashboard, open a path, and keep your momentum going with your next clear lesson.
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn-primary"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => navigate("/choose-skill")}
                  className="btn-secondary"
                >
                  Choose a Skill
                </button>
              </div>
            </div>

            <div className="panel-soft text-left">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/70">
                Next best move
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Keep the streak alive.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Head to your dashboard to continue a course, mark progress, or pick a new path that fits what you want to learn next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
