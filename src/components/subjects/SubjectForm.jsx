import { useState } from 'react'

function SubjectForm({ subject = null, onSave, onCancel }) {
  const [name, setName] = useState(subject?.name || '')
  const [description, setDescription] = useState(subject?.description || '')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return alert('Subject name is required')
    onSave({ ...(subject || {}), name: name.trim(), description: description.trim() })
  }

  return (
    <form className="subject-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Name *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="form-row">
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-actions">
        <button type="submit" className="primary">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default SubjectForm
