import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSkills } from '../lib/api';
import PageHeader from '../components/PageHeader';
import StatePanel from '../components/StatePanel';

const categoryIcons = {
  Development: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path d="M14.5 6.5 17.5 3.5 20.5 6.5 17.5 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 8 5 16 8 19 16 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 19.5 8 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  'Data & Analysis': (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path d="M5 19V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 19V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 19V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 19.5H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Design: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path d="M12 3c5 0 9 3.58 9 8 0 2.87-2.24 5-4.5 5H15a1.5 1.5 0 0 0 0 3h.5A3.5 3.5 0 0 1 19 22c-7 0-16-4.25-16-11 0-4.42 4-8 9-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="7.5" cy="11.5" r="1" fill="currentColor" />
      <circle cx="10.5" cy="8.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="8.5" r="1" fill="currentColor" />
    </svg>
  ),
  Security: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path d="M12 3 19 6v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.5 11.5a2.5 2.5 0 1 1 5 0V14h-5v-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  'Career & Soft Skills': (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="4" y="7" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
};

const ChooseSkill = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const skillData = await fetchSkills();
        setSkills(skillData);
      } catch (err) {
        console.error(err);
        setError('Learning paths are not loading right now.');
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const groupedSkills = useMemo(() => {
    return skills.reduce((groups, skill) => {
      const category = skill.categoryName || 'Other';
      groups[category] = groups[category] || [];
      groups[category].push(skill);
      return groups;
    }, {});
  }, [skills]);

  const firstSkillId = skills[0]?.id;

  return (
    <div className="page-gradient min-h-screen px-6 py-10">
      <button
        onClick={() => navigate('/dashboard')}
        className="floating-nav left-4 sm:left-6"
      >
        <span aria-hidden="true">←</span>
        Back to Dashboard
      </button>

      <button
        onClick={() => firstSkillId && navigate(`/learning-paths/${firstSkillId}`)}
        disabled={!firstSkillId}
        className="floating-nav right-4 disabled:cursor-not-allowed disabled:opacity-50 sm:right-6"
      >
        Next: Learning Path
        <span aria-hidden="true">→</span>
      </button>

      <div className="page-shell max-w-6xl">
        <PageHeader
          eyebrow="Skill Discovery"
          title="Choose a Skill to Explore"
          description="Pick a path that matches what you want to build and turn YouTube learning into progress that feels organized and real."
          align="center"
        />

        {loading ? (
          <StatePanel message="Finding the best paths for you..." />
        ) : error ? (
          <StatePanel message={error} tone="error" actionLabel="Try Again" onAction={() => window.location.reload()} />
        ) : (
          <div className="grid items-stretch gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
              <div
                key={category}
                className={`flex h-full flex-col rounded-[1.75rem] border border-emerald-100 bg-white/88 p-5 shadow-[0_22px_55px_-34px_rgba(15,23,42,0.18)] backdrop-blur ${
                  index === 2 ? 'lg:col-span-2 xl:col-span-1' : ''
                }`}
              >
                <div className="mb-4 flex items-center">
                  <span className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                    {categoryIcons[category] || (
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-emerald-700" aria-hidden="true">
                        <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">{category}</h2>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  {categorySkills.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => navigate(`/learning-paths/${skill.id}`)}
                      className="flex min-h-[220px] w-full flex-1 flex-col rounded-[1.25rem] border border-emerald-100 bg-emerald-50/35 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-[0_20px_50px_-30px_rgba(15,23,42,0.2)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold tracking-tight text-slate-900">{skill.title}</h3>
                          <p className="mt-1 text-sm font-medium text-emerald-700">{skill.level}</p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {skill.lessonCount} lessons
                        </span>
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{skill.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseSkill;
