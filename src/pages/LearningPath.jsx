import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LessonCard from '../components/LessonCard';
import { fetchLearningPath } from '../lib/api';
import { getCompletedLessons, toggleLessonComplete } from '../utils/progressStorage';
import PageHeader from '../components/PageHeader';
import AppToast from '../components/AppToast';
import StatePanel from '../components/StatePanel';

const LearningPath = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [learningPath, setLearningPath] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const loadPath = async () => {
      if (!id) {
        setError('This learning path link is missing an id.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const pathData = await fetchLearningPath(id);
        setLearningPath(pathData);
        setCompletedLessons(getCompletedLessons(pathData.id));
      } catch (err) {
        console.error('Failed to load learning path:', err);
        setError('This learning path is having trouble loading right now.');
      } finally {
        setLoading(false);
      }
    };

    loadPath();
  }, [id]);

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timeoutId = window.setTimeout(() => {
      setToastMessage('');
    }, 2400);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const progressPercent = useMemo(() => {
    if (!learningPath?.lessons?.length) return 0;
    return Math.round((completedLessons.length / learningPath.lessons.length) * 100);
  }, [completedLessons, learningPath]);

  const nextLessonId = useMemo(() => {
    if (!learningPath?.lessons?.length) return null;
    return learningPath.lessons.find((lesson) => !completedLessons.includes(lesson.id))?.id || null;
  }, [completedLessons, learningPath]);

  const handleToggleComplete = (lessonId) => {
    if (!learningPath) return;
    const lesson = learningPath.lessons.find((item) => item.id === lessonId);
    const wasCompleted = completedLessons.includes(lessonId);
    const updated = toggleLessonComplete(learningPath.id, lessonId);
    setCompletedLessons(updated);
    setToastMessage(
      wasCompleted
        ? 'Lesson marked incomplete.'
        : `Nice work. ${lesson?.title || 'This lesson'} is complete.`
    );
  };

  const handleOpenLesson = (lesson) => {
    navigate(`/course-detail/${learningPath.id}/${lesson.id}`, {
      state: { lesson, learningPath },
    });
  };

  return (
    <div className="page-gradient min-h-screen px-6 py-10">
      <AppToast message={toastMessage} />

      <button
        onClick={() => navigate('/choose-skill')}
        className="floating-nav left-4 sm:left-6"
      >
        <span aria-hidden="true">←</span>
        Back to Choose Skill
      </button>

      <div className="page-shell">
        {loading ? (
          <StatePanel message="Loading your path..." />
        ) : error ? (
          <StatePanel message={error} tone="error" actionLabel="Try Again" onAction={() => window.location.reload()} />
        ) : learningPath ? (
          <>
            <PageHeader
              eyebrow="Learning Path"
              title={learningPath.title}
              description={learningPath.description}
              supportingText={`${learningPath.outcome} Take it one lesson at a time and let the progress build naturally.`}
              aside={(
                <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/80">Path Progress</p>
                      <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">{progressPercent}%</p>
                    </div>
                    <p className="text-sm leading-6 text-slate-500">
                      {completedLessons.length} of {learningPath.lessons.length}
                    </p>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            />

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {learningPath.lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  isCompleted={completedLessons.includes(lesson.id)}
                  statusLabel={
                    completedLessons.includes(lesson.id)
                      ? 'Completed'
                      : lesson.id === nextLessonId
                        ? 'Up Next'
                        : 'Coming Up'
                  }
                  statusTone={
                    completedLessons.includes(lesson.id)
                      ? 'success'
                      : lesson.id === nextLessonId
                        ? 'accent'
                        : 'default'
                  }
                  onToggleComplete={() => handleToggleComplete(lesson.id)}
                  onOpenLesson={() => handleOpenLesson(lesson)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default LearningPath;
