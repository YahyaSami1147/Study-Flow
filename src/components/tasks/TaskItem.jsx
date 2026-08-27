function TaskItem({ task, subjects = [], onEdit, onDelete, onToggleComplete }) {
  const subject = subjects.find((s) => s.id === task.subjectId)
  const subjectName = subject ? subject.name : task.subjectId ? 'Unknown subject' : 'None'

  return (
    <div className={`task-item ${task.completed ? 'done' : ''}`}>
      <div className="left">
        <input type="checkbox" checked={!!task.completed} onChange={onToggleComplete} aria-label={`Mark ${task.title} completed`} />
      </div>
      <div className="main">
        <div className="title-row">
          <div className="title">{task.title}</div>
          <div className="meta">
            <span className="priority">{task.priority || 'low'}</span>
            {task.dueDate && <span className="due">Due {new Date(task.dueDate).toLocaleString()}</span>}
            <span className="subject">{subjectName}</span>
          </div>
        </div>
        {task.description && <div className="description">{task.description}</div>}
      </div>
      <div className="actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}

export default TaskItem
