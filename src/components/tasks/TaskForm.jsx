import { useState } from 'react'
import Dropdown from '../ui/Dropdown'

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
        <Dropdown
          id="task-subject"
          label="Subject"
          value={subjectId}
          onChange={setSubjectId}
          options={[{ value: '', label: 'None' }, ...subjects.map((s) => ({ value: s.id, label: s.name }))]}
          placeholder="None"
        />
      </div>

      <div className="form-row small-grid">
        <div>
          <label>Priority</label>
          <Dropdown
            id="task-priority"
            label="Priority"
            value={priority}
            onChange={setPriority}
            options={[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }]}
            placeholder="Priority"
          />
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
