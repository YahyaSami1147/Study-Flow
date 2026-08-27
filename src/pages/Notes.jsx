import { useEffect, useMemo, useState, useRef } from 'react'
import { useConfirm } from '../components/ui/ConfirmModal'
import storage, { NOTES_KEY, SUBJECTS_KEY } from '../services/storage'
import useLocalStorage from '../hooks/useLocalStorage'
import { makeId } from '../lib/id'
import NoteForm from '../components/notes/NoteForm'
import NoteItem from '../components/notes/NoteItem'
import '../styles/notes.css'

function Notes() {
  const [notes, setNotes] = useLocalStorage(NOTES_KEY, storage.getNotes())
  const [subjects, setSubjects] = useLocalStorage(SUBJECTS_KEY, storage.getSubjects())

  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
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

  function handleSave(note) {
    if (!note.title || !note.title.trim()) return showMessage('Title is required')
    if (!note.content || !note.content.trim()) return showMessage('Content is required')

    if (note.id) {
      setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...n, ...note, updatedAt: new Date().toISOString() } : n)))
      showMessage('Note updated')
    } else {
      const n = { ...note, id: makeId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      setNotes((prev) => [n, ...prev])
      showMessage('Note created')
    }

    setIsCreating(false)
    setEditing(null)
  }

  function handleEdit(id) {
    const n = notes.find((x) => x.id === id)
    if (n) setEditing(n)
    setIsCreating(true)
  }

  function handleDelete(id) {
    confirm('Delete this note?').then((ok) => {
      if (!ok) return
      setNotes((prev) => prev.filter((n) => n.id !== id))
      showMessage('Note deleted')
    })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = [...notes]
    if (q) {
      list = list.filter((n) => (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q))
    }
    return list.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
  }, [notes, query])

  return (
    <div className="notes-page">
      <header className="notes-header page-hero">
        <div>
          <p className="eyebrow">Writing</p>
          <h1>Notes</h1>
        </div>
        <div className="actions">
          <button onClick={handleCreate} className="primary">New Note</button>
        </div>
      </header>

      <div className="notes-controls">
        <input aria-label="Search notes" placeholder="Search notes" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="notes-grid">
        {filtered.length === 0 ? (
          <div className="empty">No notes yet. Create your first note.</div>
        ) : (
          filtered.map((n) => (
            <NoteItem key={n.id} note={n} subjects={subjects} onEdit={() => handleEdit(n.id)} onDelete={() => handleDelete(n.id)} />
          ))
        )}
      </div>

      {isCreating && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card note-form-wrap">
            <NoteForm key={editing ? editing.id : 'new'} note={editing} subjects={subjects} onSave={handleSave} onCancel={() => { setIsCreating(false); setEditing(null) }} onError={showMessage} />
          </div>
        </div>
      )}

      {message && <div className="toast" role="status">{message}</div>}
    </div>
  )
}

export default Notes
