import { useEffect, useMemo, useState, useRef } from 'react'
import { useConfirm } from '../components/ui/ConfirmModal'
import storage, { SUBJECTS_KEY, TASKS_KEY, NOTES_KEY, SESSIONS_KEY } from '../services/storage'
import useLocalStorage from '../hooks/useLocalStorage'
import { makeId } from '../lib/id'
import SubjectForm from '../components/subjects/SubjectForm'
import SubjectItem from '../components/subjects/SubjectItem'
import '../styles/subjects.css'

function Subjects() {
  const [subjects, setSubjects] = useLocalStorage(SUBJECTS_KEY, storage.getSubjects())
  const [tasks, setTasks] = useLocalStorage(TASKS_KEY, storage.getTasks())
  const [notes, setNotes] = useLocalStorage(NOTES_KEY, storage.getNotes())
  const [sessions, setSessions] = useLocalStorage(SESSIONS_KEY, storage.getSessions())

  const [isCreating, setIsCreating] = useState(false)
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const messageRef = useRef(null)
  const confirm = useConfirm()

  // persistence handled by useLocalStorage

  function showMessage(text) {
    setMessage(text)
    if (messageRef.current) clearTimeout(messageRef.current)
    messageRef.current = setTimeout(() => setMessage(''), 3000)
  }

  useEffect(() => {
    return () => { if (messageRef.current) clearTimeout(messageRef.current) }
  }, [])

  function handleCreate() {
    setEditing(null)
    setIsCreating(true)
  }

  function handleSave(subject) {
    // validate name
    if (!subject.name || !subject.name.trim()) return showMessage('Subject name is required')
    const name = subject.name.trim()
    const exists = subjects.find((s) => s.name.toLowerCase() === name.toLowerCase() && s.id !== subject.id)
    if (exists) return showMessage('A subject with that name already exists')

    if (subject.id) {
      setSubjects((prev) => prev.map((s) => (s.id === subject.id ? { ...s, name, description: subject.description || '' } : s)))
      showMessage('Subject updated')
    } else {
      const s = { id: makeId(), name, description: subject.description || '', createdAt: new Date().toISOString() }
      setSubjects((prev) => [s, ...prev])
      showMessage('Subject created')
    }

    setIsCreating(false)
    setEditing(null)
  }

  function handleEdit(id) {
    const s = subjects.find((x) => x.id === id)
    if (s) setEditing(s)
    setIsCreating(true)
  }

  function handleDelete(id) {
    const subject = subjects.find((s) => s.id === id)
    if (!subject) return
    const relatedTasks = tasks.filter((t) => t.subjectId === id)
    const relatedNotes = notes.filter((n) => n.subjectId === id)
    const relatedSessions = sessions.filter((ss) => ss.subjectId === id)

    let confirmMsg = `Delete subject "${subject.name}"?`
    if (relatedTasks.length || relatedNotes.length || relatedSessions.length) {
      confirmMsg += `\nThis will dissociate ${relatedTasks.length} tasks, ${relatedNotes.length} notes, and ${relatedSessions.length} sessions.`
    }
    confirm(confirmMsg).then((ok) => {
      if (!ok) return

      // Remove subject and clear references
      setSubjects((prev) => prev.filter((s) => s.id !== id))
      if (relatedTasks.length) setTasks((prev) => prev.map((t) => (t.subjectId === id ? { ...t, subjectId: null } : t)))
      if (relatedNotes.length) setNotes((prev) => prev.map((n) => (n.subjectId === id ? { ...n, subjectId: null } : n)))
      if (relatedSessions.length) setSessions((prev) => prev.map((ss) => (ss.subjectId === id ? { ...ss, subjectId: null } : ss)))

      showMessage('Subject deleted and references cleared')
    })
  }

  const filtered = subjects.filter((s) => s.name.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <div className="subjects-page">
      <header className="subjects-header page-hero">
        <div>
          <p className="eyebrow">Library</p>
          <h1>Subjects</h1>
        </div>
        <div className="actions">
          <button onClick={handleCreate} className="primary">New Subject</button>
        </div>
      </header>

      <div className="subjects-controls">
        <input aria-label="Search subjects" placeholder="Search subjects" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="subjects-grid">
        {filtered.length === 0 ? (
          <div className="empty">No subjects yet. Create one to organize tasks and notes.</div>
        ) : (
          filtered.map((s) => (
            <SubjectItem
              key={s.id}
              subject={s}
              onEdit={() => handleEdit(s.id)}
              onDelete={() => handleDelete(s.id)}
              taskCount={tasks.filter((t) => t.subjectId === s.id).length}
              studySeconds={sessions.filter((ss) => ss.subjectId === s.id).reduce((a, b) => a + (b.durationSeconds || 0), 0)}
            />
          ))
        )}
      </div>

      {isCreating && (
        <div className="subject-form-wrap">
          <SubjectForm key={editing ? editing.id : 'new'} subject={editing} onSave={handleSave} onCancel={() => { setIsCreating(false); setEditing(null) }} onError={showMessage} />
        </div>
      )}

      {message && <div className="toast" role="status">{message}</div>}
    </div>
  )
}

export default Subjects
