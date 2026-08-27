import { useEffect, useMemo, useState } from 'react'
import storage, { SUBJECTS_KEY, SESSIONS_KEY } from '../services/storage'
import useStudyTimer from '../hooks/useStudyTimer'
import useLocalStorage from '../hooks/useLocalStorage'
import '../styles/sessions.css'
import Dropdown from '../components/ui/Dropdown'
import { useToast } from '../components/ui/ToastProvider'

function formatHMS(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600)
  const mins = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60
  return `${hrs > 0 ? hrs + 'h ' : ''}${mins}m ${secs}s`
}

function Sessions() {
  const [subjects, setSubjects] = useLocalStorage(SUBJECTS_KEY, storage.getSubjects())
  const [sessions, setSessions] = useLocalStorage(SESSIONS_KEY, storage.getSessions())
  const [selectedSubject, setSelectedSubject] = useState('')

  const { seconds, isRunning, isPaused, start, pause, resume, stop, active } = useStudyTimer()

  // sessions are persisted via useLocalStorage

  const toast = useToast()

  function handleStart(subjectId) {
    start(subjectId)
    toast.show('Session started')
  }

  function handlePause() {
    pause()
  }

  function handleResume() {
    resume()
  }

  function handleStop() {
    const completed = stop()
    if (completed) {
      setSessions((prev) => [completed, ...prev])
      toast.show('Session saved')
    }
  }

  const totalStudySeconds = useMemo(() => sessions.reduce((s, x) => s + (x.durationSeconds || 0), 0), [sessions])

  return (
    <div className="sessions-page">
      <header className="sessions-header page-hero">
        <div>
          <p className="eyebrow">Focus</p>
          <h1>Study sessions</h1>
          <p className="lede">Total study time: {formatHMS(totalStudySeconds)}</p>
        </div>
      </header>

      <section className="session-control">
        <div className="control-row">
          <label htmlFor="session-subject">Subject</label>
          <Dropdown
            id="session-subject"
            label="Subject"
            value={selectedSubject}
            onChange={setSelectedSubject}
            options={[{ value: '', label: 'General' }, ...subjects.map((s) => ({ value: s.id, label: s.name }))]}
            placeholder="Select subject"
          />
        </div>

        <div className="timer-display">{formatHMS(seconds)}</div>

        <div className="control-actions">
          {!isRunning && !isPaused && (
            <button className="primary" onClick={() => handleStart(selectedSubject || null)}>Start</button>
          )}

          {isRunning && (
            <>
              <button onClick={handlePause}>Pause</button>
              <button onClick={handleStop}>Stop</button>
            </>
          )}

          {isPaused && (
            <>
              <button onClick={handleResume}>Resume</button>
              <button onClick={handleStop}>Stop</button>
            </>
          )}
        </div>
      </section>

      <section className="sessions-list">
        <h2>Recent Sessions</h2>
        {sessions.length === 0 ? (
          <div className="empty">No sessions yet.</div>
        ) : (
          <ul>
            {sessions.map((s) => (
              <li key={s.id} className="session-item">
                <div className="left">
                  <div className="subject">{(subjects.find((x) => x.id === s.subjectId) || {}).name || 'General'}</div>
                  <div className="time">{formatHMS(s.durationSeconds || 0)}</div>
                </div>
                <div className="right">
                  <div className="when">{new Date(s.completedAt).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Sessions
