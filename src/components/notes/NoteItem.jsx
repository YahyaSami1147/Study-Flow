function NoteItem({ note, subjects = [], onEdit, onDelete }) {
  const subject = subjects.find((s) => s.id === note.subjectId)
  const subjectName = subject ? subject.name : note.subjectId ? 'Unknown subject' : 'None'

  return (
    <article className="note-card">
      <header>
        <h3>{note.title}</h3>
        <div className="meta">
          <span className="subject">{subjectName}</span>
          <span className="time">{new Date(note.updatedAt || note.createdAt).toLocaleString()}</span>
        </div>
      </header>
      <section className="content">{note.content}</section>
      <footer className="card-actions">
        <button type="button" className="btn-ghost" onClick={onEdit}>Edit</button>
        <button type="button" className="btn-danger" onClick={onDelete}>Delete</button>
      </footer>
    </article>
  )
}

export default NoteItem
