const PROGRESS_STORAGE_KEY = 'arcoria-progress';
const NOTES_STORAGE_KEY = 'arcoria-lesson-notes';
const ACTIVITY_STORAGE_KEY = 'arcoria-progress-activity';

function readStorage(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error(`Failed to read ${key} from localStorage:`, error);
    return {};
  }
}

function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodayKey() {
  return formatDateKey(new Date());
}

function recordProgressActivity() {
  const activity = readStorage(ACTIVITY_STORAGE_KEY);
  const dayKey = getTodayKey();

  activity.days = Array.from(new Set([...(activity.days || []), dayKey])).sort();
  writeStorage(ACTIVITY_STORAGE_KEY, activity);
}

function readNoteEntry(pathId, lessonId) {
  const notes = readStorage(NOTES_STORAGE_KEY);
  const entry = notes?.[pathId]?.[lessonId];

  if (!entry) {
    return { text: '', updatedAt: null };
  }

  if (typeof entry === 'string') {
    return { text: entry, updatedAt: null };
  }

  return {
    text: entry.text || '',
    updatedAt: entry.updatedAt || null,
  };
}

export function getCompletedLessons(pathId) {
  const progress = readStorage(PROGRESS_STORAGE_KEY);
  return progress[pathId] || [];
}

export function toggleLessonComplete(pathId, lessonId) {
  const progress = readStorage(PROGRESS_STORAGE_KEY);
  const currentLessons = new Set(progress[pathId] || []);
  const wasCompleted = currentLessons.has(lessonId);

  if (wasCompleted) {
    currentLessons.delete(lessonId);
  } else {
    currentLessons.add(lessonId);
    recordProgressActivity();
  }

  progress[pathId] = Array.from(currentLessons);
  writeStorage(PROGRESS_STORAGE_KEY, progress);

  return progress[pathId];
}

export function getLessonNotes(pathId, lessonId) {
  return readNoteEntry(pathId, lessonId).text;
}

export function getLessonNoteMeta(pathId, lessonId) {
  return readNoteEntry(pathId, lessonId);
}

export function saveLessonNotes(pathId, lessonId, noteText) {
  const notes = readStorage(NOTES_STORAGE_KEY);
  notes[pathId] = notes[pathId] || {};
  const updatedAt = new Date().toISOString();
  notes[pathId][lessonId] = {
    text: noteText,
    updatedAt,
  };
  writeStorage(NOTES_STORAGE_KEY, notes);
  return notes[pathId][lessonId];
}

export function recordRecentLesson(path, lesson) {
  if (!path?.id || !lesson?.id) return;

  const activity = readStorage(ACTIVITY_STORAGE_KEY);
  activity.lastLesson = {
    pathId: path.id,
    pathTitle: path.title,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    viewedAt: new Date().toISOString(),
  };
  writeStorage(ACTIVITY_STORAGE_KEY, activity);
}

export function getRecentLesson() {
  const activity = readStorage(ACTIVITY_STORAGE_KEY);
  return activity.lastLesson || null;
}

export function getCurrentStreak() {
  const activity = readStorage(ACTIVITY_STORAGE_KEY);
  const days = new Set(activity.days || []);
  let streak = 0;
  const currentDate = new Date();

  while (true) {
    const dayKey = formatDateKey(currentDate);
    if (!days.has(dayKey)) break;
    streak += 1;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}

export function buildProgressSummary(skills) {
  const progress = readStorage(PROGRESS_STORAGE_KEY);

  return skills.map((skill) => {
    const completedCount = (progress[skill.id] || []).length;
    const lessonCount = skill.lessonCount || 0;

    return {
      ...skill,
      completedCount,
      progressPercent: lessonCount ? Math.round((completedCount / lessonCount) * 100) : 0,
    };
  });
}
