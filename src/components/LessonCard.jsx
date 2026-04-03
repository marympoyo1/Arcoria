import React from 'react';

const LightbulbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-amber-500" aria-hidden="true">
    <path d="M9.5 18.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 14.5c-1.06-.88-2-2.36-2-4.25A6 6 0 0 1 12 4a6 6 0 0 1 6 6.25c0 1.89-.94 3.37-2 4.25-.73.61-1.19 1.19-1.41 1.75h-5.18C9.19 15.69 8.73 15.11 8 14.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const LessonCard = ({
  lesson,
  index,
  isCompleted,
  statusLabel,
  statusTone = 'default',
  onToggleComplete,
  onOpenLesson,
}) => {
  const statusClasses = {
    success: 'bg-emerald-100 text-emerald-700',
    accent: 'bg-emerald-600 text-white',
    default: 'bg-slate-100 text-slate-600',
  };

  return (
    <article className="rounded-[1.25rem] border border-emerald-100/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-34px_rgba(15,23,42,0.25)]">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Lesson {index + 1}
          </p>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">{lesson.title}</h3>
        </div>
        <div className="text-right">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[statusTone] || statusClasses.default}`}>
            {statusLabel}
          </span>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            {lesson.duration}
          </p>
        </div>
      </div>

      <p className="text-sm leading-6 text-slate-600">{lesson.description}</p>

      {lesson.videos?.[0] && (
        <div className="mt-4 rounded-[1rem] border border-emerald-100 bg-emerald-50/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/80">
            Curated Video
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{lesson.videos[0].title}</p>
          <p className="mt-1 text-sm text-slate-600">{lesson.videos[0].channel}</p>
        </div>
      )}

      {lesson.projectIdea && (
        <div className="mt-4 rounded-[0.9rem] border border-amber-100 bg-amber-50/70 px-3.5 py-3">
          <div className="flex items-center gap-2">
            <LightbulbIcon />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Practice Idea
            </p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-700">{lesson.projectIdea}</p>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button onClick={onOpenLesson} className="btn-primary px-4 py-3">
          Open Lesson
        </button>
        <button
          onClick={onToggleComplete}
          className={`inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition ${
            isCompleted
              ? 'border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
              : 'border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
      </div>
    </article>
  );
};

export default LessonCard;
