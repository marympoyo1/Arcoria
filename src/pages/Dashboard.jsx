import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLearningPath, fetchSkills } from '../lib/api';
import { buildProgressSummary, getCompletedLessons, getCurrentStreak, getRecentLesson } from '../utils/progressStorage';
import PageHeader from '../components/PageHeader';
import StatePanel from '../components/StatePanel';

const Dashboard = () => {
  const [skills, setSkills] = useState([]);
  const [learningPaths, setLearningPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const skillData = await fetchSkills();
        setSkills(skillData);
        const pathResults = await Promise.allSettled(skillData.map((skill) => fetchLearningPath(skill.id)));
        setLearningPaths(
          pathResults
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value)
        );
      } catch (err) {
        console.error(err);
        setError('Your dashboard is having trouble loading right now.');
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const progressSummary = useMemo(() => buildProgressSummary(skills), [skills]);
  const totalLessons = progressSummary.reduce((sum, skill) => sum + skill.lessonCount, 0);
  const completedLessons = progressSummary.reduce((sum, skill) => sum + skill.completedCount, 0);
  const progressPercent = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const recentSkills = progressSummary.filter((skill) => skill.completedCount > 0).slice(0, 3);
  const streakCount = getCurrentStreak();
  const firstSkillId = progressSummary[0]?.id;

  const continueLesson = useMemo(() => {
    if (!learningPaths.length) return null;

    const recentLesson = getRecentLesson();
    if (recentLesson) {
      const recentPath = learningPaths.find((path) => path.id === recentLesson.pathId);
      const recentCompletedLessons = recentPath ? getCompletedLessons(recentPath.id) : [];
      const recentLessonItem = recentPath?.lessons.find((lesson) => lesson.id === recentLesson.lessonId);

      if (recentPath && recentLessonItem && !recentCompletedLessons.includes(recentLessonItem.id)) {
        return {
          pathId: recentPath.id,
          pathTitle: recentPath.title,
          lessonId: recentLessonItem.id,
          lessonTitle: recentLessonItem.title,
          description: recentLessonItem.description,
          progressText: `${recentCompletedLessons.length} of ${recentPath.lessons.length} lessons completed`,
        };
      }
    }

    const candidatePaths = [...learningPaths].sort((a, b) => {
      const progressA = getCompletedLessons(a.id).length;
      const progressB = getCompletedLessons(b.id).length;
      return progressB - progressA;
    });

    for (const path of candidatePaths) {
      const completed = getCompletedLessons(path.id);
      const nextLesson = path.lessons.find((lesson) => !completed.includes(lesson.id));

      if (nextLesson) {
        return {
          pathId: path.id,
          pathTitle: path.title,
          lessonId: nextLesson.id,
          lessonTitle: nextLesson.title,
          description: nextLesson.description,
          progressText: `${completed.length} of ${path.lessons.length} lessons completed`,
        };
      }
    }

    return null;
  }, [learningPaths, progressSummary]);

  return (
    <div className="page-gradient min-h-screen px-6 py-10">
      <button
        onClick={() => navigate('/choose-skill')}
        className="floating-nav right-4 sm:right-6"
      >
        Next: Choose Skill
        <span aria-hidden="true">→</span>
      </button>

      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow="Your Progress"
          title="Dashboard"
          description="Pick up where you left off, keep your streak going, and build stronger habits around the tech skills you actually want to use."
          aside={(
            <div className="rounded-[1.5rem] border border-emerald-100 bg-white px-5 py-4 shadow-sm lg:min-w-[280px]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/80">Learning Arc</p>
                  <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">{progressPercent}%</p>
                </div>
                <p className="text-sm leading-6 text-slate-500">
                  {completedLessons} of {totalLessons} lessons
                </p>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="mt-4 flex flex-col gap-3 rounded-[1rem] bg-emerald-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/75">Current Streak</p>
                  <p className="mt-1 text-lg font-bold tracking-tight text-slate-900">
                    {streakCount} {streakCount === 1 ? 'day' : 'days'}
                  </p>
                </div>
                <p className="max-w-[180px] text-xs leading-5 text-slate-500 sm:text-right">
                  Finish one lesson today and keep the streak alive!
                </p>
              </div>
            </div>
          )}
        />

        {loading ? (
          <StatePanel message="Pulling your dashboard together..." />
        ) : error ? (
          <StatePanel message={error} tone="error" actionLabel="Try Again" onAction={() => window.location.reload()} />
        ) : (
          <>
            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <section className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm">
                {continueLesson ? (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-emerald-700">Continue Learning</p>
                        <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">{continueLesson.lessonTitle}</h3>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Up Next
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-500">{continueLesson.pathTitle}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{continueLesson.description}</p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-slate-500">{continueLesson.progressText} in your current path.</p>
                      <button
                        onClick={() => navigate(`/course-detail/${continueLesson.pathId}/${continueLesson.lessonId}`)}
                        className="btn-primary w-full sm:w-auto"
                      >
                        Resume Lesson
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-emerald-700">Start Your First Path</p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">Start small and build real momentum.</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                      Pick a skill, open a focused path, and turn random YouTube watching into progress you can actually see.
                    </p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-slate-500">A focused path makes it easier to know what comes next.</p>
                      <button
                        onClick={() => navigate(firstSkillId ? `/learning-paths/${firstSkillId}` : '/choose-skill')}
                        className="btn-primary w-full sm:w-auto"
                      >
                        {firstSkillId ? 'Start Learning' : 'Browse Skills'}
                      </button>
                    </div>
                  </>
                )}
              </section>

              <section className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50/60 p-5">
                <p className="mb-3 text-sm font-semibold text-emerald-700">Recently Active</p>
                {recentSkills.length === 0 ? (
                  <p className="text-sm leading-7 text-slate-500">
                    You haven't completed any lessons yet. Start a path and your progress will show up here.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {recentSkills.map((skill) => (
                      <li key={skill.id} className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                        <p className="text-sm font-medium text-slate-800">{skill.title}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {skill.completedCount} of {skill.lessonCount} lessons completed
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            <section className="section-shell p-5 sm:p-6">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-1 text-sm font-semibold text-emerald-700">Available Paths</p>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">Pick a path and keep moving.</h3>
                </div>
                <p className="max-w-xl text-sm leading-6 text-slate-500">Each path keeps things focused, practical, and easier to stick with.</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {progressSummary.map((skill) => (
                  <div key={skill.id} className="rounded-[1.25rem] border border-emerald-100 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold tracking-tight text-slate-900">{skill.title}</h4>
                        <p className="mt-1 text-sm text-emerald-700">{skill.level}</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {skill.progressPercent}%
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{skill.description}</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                        style={{ width: `${skill.progressPercent}%` }}
                      />
                    </div>
                    <button
                      onClick={() => navigate(`/learning-paths/${skill.id}`)}
                      className="btn-primary mt-5 w-full"
                    >
                      Open Path
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
