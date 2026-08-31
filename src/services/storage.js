export const TASKS_KEY = 'studyflow_tasks'
export const SUBJECTS_KEY = 'studyflow_subjects'
export const SESSIONS_KEY = 'studyflow_sessions'
export const NOTES_KEY = 'studyflow_notes'
export const ACTIVE_SESSION_KEY = 'studyflow_active_session'

function safeParse(value, fallback) {
  try {
    if (value == null) return fallback

    const parsed = JSON.parse(value)
    if (parsed == null) return fallback

    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback
    if (typeof fallback === 'object' && fallback !== null && !Array.isArray(fallback) && (typeof parsed !== 'object' || Array.isArray(parsed))) {
      return fallback
    }

    return parsed
  } catch {
    return fallback
  }
}

export function getTasks() {
  const raw = localStorage.getItem(TASKS_KEY)
  return safeParse(raw, [])
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export function getSubjects() {
  const raw = localStorage.getItem(SUBJECTS_KEY)
  return safeParse(raw, [])
}

export function saveSubjects(subjects) {
  localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects))
}

export function getSessions() {
  const raw = localStorage.getItem(SESSIONS_KEY)
  return safeParse(raw, [])
}

export function getNotes() {
  const raw = localStorage.getItem(NOTES_KEY)
  return safeParse(raw, [])
}

export function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
}

export function getActiveSession() {
  const raw = localStorage.getItem(ACTIVE_SESSION_KEY)
  return safeParse(raw, null)
}

export function saveActiveSession(active) {
  if (active == null) {
    localStorage.removeItem(ACTIVE_SESSION_KEY)
    return
  }
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(active))
}

export function saveSessions(sessions) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
}

export function resetAll() {
  try {
    localStorage.clear()
  } catch {
    /* ignore */
  }
}

export default {
  getTasks,
  saveTasks,
  getSubjects,
  saveSubjects,
  getSessions,
  getNotes,
  saveNotes,
  saveSessions,
  getActiveSession,
  saveActiveSession,
  resetAll,
  TASKS_KEY,
  SUBJECTS_KEY,
  SESSIONS_KEY,
  NOTES_KEY,
  ACTIVE_SESSION_KEY,
}
