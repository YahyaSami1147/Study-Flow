import { useEffect, useMemo, useState } from 'react'
import storage from '../services/storage'
import NoteForm from '../components/notes/NoteForm'
import NoteItem from '../components/notes/NoteItem'
import '../styles/notes.css'

function genId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function Notes() {
  const [notes, setNotes] = useState(() => storage.getNotes())
  const [subjects, setSubjects] = useState(() => storage.getSubjects())

  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    storage.saveNotes(notes)
  }, [notes])

  function showMessage(text) {
    setMessage(text)
    setTimeout(() => setMessage(''), 3000)
  }

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
      const n = { ...note, id: genId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
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
    if (!confirm('Delete this note?')) return
    setNotes((prev) => prev.filter((n) => n.id !== id))
    showMessage('Note deleted')
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
      <header className="notes-header">
        <h1>Notes</h1>
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
        <div className="note-form-wrap">
          <NoteForm key={editing ? editing.id : 'new'} note={editing} subjects={subjects} onSave={handleSave} onCancel={() => { setIsCreating(false); setEditing(null) }} />
        </div>
      )}

      {message && <div className="toast" role="status">{message}</div>}
    </div>
  )
}

export default Notes
