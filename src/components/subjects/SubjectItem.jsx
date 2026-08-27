function SubjectItem({ subject, onEdit, onDelete, taskCount = 0, studySeconds = 0 }) {
  function formatHMS(sec) {
    const hrs = Math.floor(sec / 3600)
    const mins = Math.floor((sec % 3600) / 60)
    return `${hrs > 0 ? hrs + 'h ' : ''}${mins}m`
  }

  return (
    <article className="subject-card card">
      <header className="subject-header">
        <h3>{subject.name}</h3>
        <div className="subject-controls">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </header>
      <div className="subject-desc">{subject.description}</div>
      <footer className="subject-meta">
        <div>{taskCount} tasks</div>
        <div>{formatHMS(studySeconds)} studied</div>
      </footer>
    </article>
  )
}

export default SubjectItem
