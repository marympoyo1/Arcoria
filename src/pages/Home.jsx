import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/animation.json';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page-gradient flex flex-col">
      <div className="page-shell flex-1 py-14 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-5">
              <p className="eyebrow">LEARN SMARTER, NOT HARDER.</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 leading-[0.96]">
                Track your learning arc.
              </h1>
              <p className="max-w-xl text-xl sm:text-2xl font-semibold text-emerald-900 leading-snug">
                Build real tech skills through curated YouTube learning paths.
              </p>
              <p className="max-w-xl text-base sm:text-lg text-slate-700 leading-8">
                Stay organized, keep your momentum, and grow from beginner to pro
                with a clearer path through development, data, design, and hands-on tech practice.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate('/login')}
                className="btn-primary px-6"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/learn-more')}
                className="btn-secondary px-6"
              >
                How It Works
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-x-8 -top-6 h-28 rounded-full bg-emerald-200/60 blur-3xl" />
            <div className="section-shell overflow-hidden p-4">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between rounded-full border border-emerald-100 bg-white/90 px-4 py-3 shadow-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/70">
                      Arcoria
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      A clearer way to learn tech
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Beginner to Pro
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-emerald-100">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Progress
                    </p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">72%</p>
                    <p className="mt-2 text-sm text-slate-600">
                      See what you've finished and what to tackle next.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-600 p-4 text-white shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                      Current Path
                    </p>
                    <p className="mt-3 text-lg font-semibold">Frontend Foundations</p>
                    <p className="mt-2 text-sm text-emerald-50/90">
                      Curated lessons, steady progress, and next steps that actually make sense.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-emerald-100 bg-white/90 p-4 sm:p-6">
                  <Lottie animationData={animationData} loop className="h-auto max-h-[320px] w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/70 bg-white/80 px-4 py-6 text-xs sm:text-sm backdrop-blur">
        <div className="page-shell grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Arcoria</h3>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Arcoria helps learners turn YouTube into a cleaner, more focused route toward real tech skills.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Explore</h3>
            <ul className="space-y-1 text-[11px] text-slate-500">
              <li><a href="/" className="hover:text-slate-700 hover:underline">Home</a></li>
              <li><a href="/login" className="hover:text-slate-700 hover:underline">Get Started</a></li>
              <li><a href="/learn-more" className="hover:text-slate-700 hover:underline">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Platform</h3>
            <ul className="space-y-1 text-[11px] text-slate-500">
              <li><a href="#" className="hover:text-slate-700 hover:underline">Curated Video Paths</a></li>
              <li><a href="#" className="hover:text-slate-700 hover:underline">Progress Tracking</a></li>
              <li><a href="#" className="hover:text-slate-700 hover:underline">Tech Skill Growth</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Contact</h3>
            <ul className="space-y-1 text-[11px] text-slate-500">
              <li>Email: <a href="mailto:support@arcoria.com" className="text-emerald-700 hover:underline">support@arcoria.com</a></li>
              <li>Phone: <span className="text-slate-600">+1 (208) 805-9594</span></li>
              <li>Address: <span className="text-slate-600">Houston, TX</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-slate-400">
          © 2025 Arcoria. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
