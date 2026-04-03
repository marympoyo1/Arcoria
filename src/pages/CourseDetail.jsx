import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchLearningPath } from '../lib/api';
import {
  getCompletedLessons,
  getLessonNoteMeta,
  getLessonNotes,
  recordRecentLesson,
  saveLessonNotes,
  toggleLessonComplete,
} from '../utils/progressStorage';
import PageHeader from '../components/PageHeader';
import AppToast from '../components/AppToast';
import StatePanel from '../components/StatePanel';
import SummaryStat from '../components/SummaryStat';

const LightbulbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-amber-500" aria-hidden="true">
    <path d="M9.5 18.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 14.5c-1.06-.88-2-2.36-2-4.25A6 6 0 0 1 12 4a6 6 0 0 1 6 6.25c0 1.89-.94 3.37-2 4.25-.73.61-1.19 1.19-1.41 1.75h-5.18C9.19 15.69 8.73 15.11 8 14.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const CourseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathId, lessonId } = useParams();
  const stateLesson = location.state?.lesson;
  const statePath = location.state?.learningPath;
  const [learningPath, setLearningPath] = useState(statePath || null);
  const [lesson, setLesson] = useState(stateLesson || null);
  const [completedLessons, setCompletedLessons] = useState(getCompletedLessons(pathId));
  const [loading, setLoading] = useState(!stateLesson);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');
  const [notesStatus, setNotesStatus] = useState('');
  const [notesUpdatedAt, setNotesUpdatedAt] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (stateLesson && statePath) return;

    const loadLesson = async () => {
      try {
        setLoading(true);
        const pathData = await fetchLearningPath(pathId);
        const matchedLesson = pathData.lessons.find((item) => item.id === lessonId);

        if (!matchedLesson) {
          throw new Error('Lesson not found');
        }

        setLearningPath(pathData);
        setLesson(matchedLesson);
        setCompletedLessons(getCompletedLessons(pathData.id));
      } catch (err) {
        console.error(err);
        setError('This lesson is having trouble loading right now.');
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId, pathId, stateLesson, statePath]);

  useEffect(() => {
    if (!lesson || !pathId) return;
    const noteMeta = getLessonNoteMeta(pathId, lesson.id);
    setNotes(getLessonNotes(pathId, lesson.id));
    setNotesUpdatedAt(noteMeta.updatedAt);
    setNotesStatus('');
  }, [lesson, pathId]);

  useEffect(() => {
    if (!lesson || !learningPath) return;
    recordRecentLesson(learningPath, lesson);
  }, [learningPath, lesson]);

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timeoutId = window.setTimeout(() => {
      setToastMessage('');
    }, 2400);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const isCompleted = useMemo(() => {
    return lesson ? completedLessons.includes(lesson.id) : false;
  }, [completedLessons, lesson]);

  const handleToggleComplete = () => {
    if (!lesson) return;
    const updated = toggleLessonComplete(pathId, lesson.id);
    setCompletedLessons(updated);
    setToastMessage(isCompleted ? 'Lesson marked incomplete.' : `Nice work. You completed ${lesson.title}.`);
  };

  const handleSaveNotes = () => {
    if (!lesson) return;
    const savedEntry = saveLessonNotes(pathId, lesson.id, notes);
    setNotesUpdatedAt(savedEntry.updatedAt);
    setNotesStatus('Saved in this browser');
    setToastMessage('Notes saved.');
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
    setNotesStatus('Unsaved changes');
  };

  if (loading) {
    return (
      <div className="page-gradient min-h-screen p-6">
        <div className="page-shell">
          <StatePanel message="Loading your lesson..." />
        </div>
      </div>
    );
  }

  if (error || !lesson || !learningPath) {
    return (
      <div className="page-gradient min-h-screen p-6">
        <div className="page-shell">
          <StatePanel
            message={error || 'Please go back and select a lesson.'}
            tone="error"
            actionLabel="Back to Learning Path"
            onAction={() => navigate(`/learning-paths/${pathId}`)}
          />
        </div>
      </div>
    );
  }

  const formatSavedAt = (timestamp) => {
    if (!timestamp) return 'Notes save automatically when you click away.';

    return `Last saved ${new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(timestamp))}`;
  };

  return (
    <div className="page-gradient min-h-screen px-6 py-10">
      <AppToast message={toastMessage} />

      <button
        onClick={() => navigate(`/learning-paths/${pathId}`)}
        className="floating-nav left-4 sm:left-6"
      >
        <span aria-hidden="true">←</span>
        Back to Learning Path
      </button>

      <div className="page-shell">
        <div className="section-shell mx-auto max-w-5xl p-5 sm:p-6">
          <div className="space-y-6">
            <PageHeader
              eyebrow={learningPath.title}
              title={lesson.title}
              description={`${lesson.description} The goal here is to help the ideas stick so you can use them in projects, classwork, and early career practice.`}
              className="mb-0"
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <SummaryStat label="Duration" value={lesson.duration} />
              <SummaryStat
                label="Progress"
                value={`${completedLessons.length} / ${learningPath.lessons.length} lessons`}
              />
              <SummaryStat label="Status" value={isCompleted ? 'Completed' : 'In Progress'} />
            </div>

            <div className="space-y-5">
              {lesson.videos.map((video) => (
                <div key={video.id} className="overflow-hidden rounded-[1.25rem] border border-emerald-100 bg-white shadow-sm">
                  <iframe
                    className="aspect-video w-full"
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                  <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-end sm:justify-between">
                    <p className="text-lg font-bold tracking-tight text-slate-900">{video.title}</p>
                    <div className="sm:text-right">
                      <p className="text-sm font-medium text-emerald-700">{video.channel}</p>
                      {video.watchUrl ? (
                        <a
                          href={video.watchUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-slate-600 transition hover:text-emerald-700"
                        >
                          Open on YouTube
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {lesson.projectIdea ? (
              <div className="rounded-[0.95rem] border border-amber-100 bg-amber-50/70 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <LightbulbIcon />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Practice Idea</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">{lesson.projectIdea}</p>
              </div>
            ) : null}

            <div className="rounded-[1.25rem] border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/80">Notes</p>
                  <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">Capture what clicked.</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Keep quick takeaways, coding ideas, questions, or next steps for this lesson. Your notes stay saved in this browser.
                  </p>
                </div>
                <button onClick={handleSaveNotes} className="btn-secondary w-full sm:w-auto">
                  Save Notes
                </button>
              </div>

              <textarea
                value={notes}
                onChange={handleNotesChange}
                onBlur={handleSaveNotes}
                placeholder="Write down the concepts that clicked, commands or syntax to revisit, project ideas, or what you want to practice next."
                className="mt-4 min-h-[180px] w-full rounded-[1rem] border border-emerald-100 bg-emerald-50/35 px-4 py-3 text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
              <div className="mt-3 flex flex-col gap-1 text-sm font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>{notesStatus || 'Notes save automatically when you click away.'}</p>
                <p>{formatSavedAt(notesUpdatedAt)}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-emerald-100 pt-5 sm:flex-row">
              <button
                onClick={handleToggleComplete}
                className={`w-full rounded-full px-4 py-3 text-sm font-semibold transition sm:w-auto ${
                  isCompleted
                    ? 'border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                    : 'bg-emerald-600 text-white shadow-[0_14px_30px_-14px_rgba(22,163,74,0.8)] hover:bg-emerald-700'
                }`}
              >
                {isCompleted ? 'Mark Lesson Incomplete' : 'Mark Lesson Complete'}
              </button>
              <button
                onClick={() => navigate(`/learning-paths/${pathId}`)}
                className="btn-secondary w-full sm:w-auto"
              >
                Back to Path
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
