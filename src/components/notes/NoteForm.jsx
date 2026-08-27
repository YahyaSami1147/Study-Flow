import { useState } from 'react'
import Dropdown from '../ui/Dropdown'

function NoteForm({ note = null, subjects = [], onSave, onCancel, onError }) {
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [subjectId, setSubjectId] = useState(note?.subjectId || '')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return onError ? onError('Title is required') : null
    if (!content.trim()) return onError ? onError('Content is required') : null

    const out = {
      ...(note || {}),
      title: title.trim(),
      content: content.trim(),
      subjectId: subjectId || null,
      updatedAt: new Date().toISOString(),
    }
    onSave(out)
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="note-title">Title *</label>
        <input id="note-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="form-row">
        <label>Content *</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
      </div>

      <div className="form-row">
        <label htmlFor="note-subject">Subject</label>
        <Dropdown
          id="note-subject"
          label="Subject"
          value={subjectId}
          onChange={setSubjectId}
          options={[{ value: '', label: 'None' }, ...subjects.map((s) => ({ value: s.id, label: s.name }))]}
          placeholder="None"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="primary">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default NoteForm
