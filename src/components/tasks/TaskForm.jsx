import { useState } from 'react'

function TaskForm({ task = null, subjects = [], onSave, onCancel, onError }) {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [subjectId, setSubjectId] = useState(task?.subjectId || '')
  const [priority, setPriority] = useState(task?.priority || 'low')
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.slice(0, 16) : '')
  const [completed, setCompleted] = useState(!!task?.completed)

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return onError ? onError('Title is required') : null

    const out = {
      ...(task || {}),
      title: title.trim(),
      description: description.trim(),
      subjectId: subjectId || null,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      completed,
    }
    onSave(out)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="task-title">Title *</label>
        <input id="task-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="form-row">
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="task-subject">Subject</label>
        <select id="task-subject" value={subjectId || ''} onChange={(e) => setSubjectId(e.target.value)}>
          <option value="">None</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="form-row small-grid">
        <div>
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Due</label>
          <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
      </div>

      <div className="form-row check">
        <label>
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />{' '}
          Completed
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default TaskForm
