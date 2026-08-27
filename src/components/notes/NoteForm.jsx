import { useState } from 'react'

function NoteForm({ note = null, subjects = [], onSave, onCancel }) {
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [subjectId, setSubjectId] = useState(note?.subjectId || '')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return alert('Title is required')
    if (!content.trim()) return alert('Content is required')

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
        <label>Title *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="form-row">
        <label>Content *</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
      </div>

      <div className="form-row">
        <label>Subject</label>
        <select value={subjectId || ''} onChange={(e) => setSubjectId(e.target.value)}>
          <option value="">None</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default NoteForm
