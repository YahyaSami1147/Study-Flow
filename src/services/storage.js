const TASKS_KEY = 'studyflow_tasks'
const SUBJECTS_KEY = 'studyflow_subjects'
const SESSIONS_KEY = 'studyflow_sessions'
const NOTES_KEY = 'studyflow_notes'
const ACTIVE_SESSION_KEY = 'studyflow_active_session'

function safeParse(value, fallback) {
  try {
    return JSON.parse(value) ?? fallback
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

export default {
  getTasks,
  saveTasks,
  getSubjects,
  saveSubjects,
  getSessions,
  getNotes,
  saveNotes,
  saveSessions,
}
