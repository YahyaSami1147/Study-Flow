import { useEffect, useMemo, useState, useRef } from 'react'
import { useConfirm } from '../components/ui/ConfirmModal'
import { useToast } from '../components/ui/ToastProvider'
import storage, { TASKS_KEY, SUBJECTS_KEY } from '../services/storage'
import { makeId } from '../lib/id'
import useLocalStorage from '../hooks/useLocalStorage'
import TaskForm from '../components/tasks/TaskForm'
import TaskItem from '../components/tasks/TaskItem'
import '../styles/tasks.css'
import Dropdown from '../components/ui/Dropdown'



function Tasks() {
  const [tasks, setTasks] = useLocalStorage(TASKS_KEY, storage.getTasks())
  const [subjects, setSubjects] = useLocalStorage(SUBJECTS_KEY, storage.getSubjects())

  const [isCreating, setIsCreating] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')

  const toast = useToast()
  const confirm = useConfirm()

  // persistence is handled by useLocalStorage

  function showMessage(text) { toast.show(text) }

  function handleCreate() {
    setEditingTask(null)
    setIsCreating(true)
  }

  function handleSave(task) {
    if (!task.title || !task.title.trim()) {
      showMessage('Task title is required')
      return
    }

    if (task.id) {
      // update
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, ...task, updatedAt: new Date().toISOString() } : t)))
      showMessage('Task updated')
    } else {
      const newTask = {
        ...task,
        id: makeId(),
        completed: task.completed || false,
        createdAt: new Date().toISOString(),
      }
      setTasks((prev) => [newTask, ...prev])
      showMessage('Task created')
    }

    setIsCreating(false)
    setEditingTask(null)
  }

  function handleEdit(taskId) {
    const t = tasks.find((x) => x.id === taskId)
    if (t) setEditingTask(t)
    setIsCreating(true)
  }

  function handleDelete(taskId) {
    // show confirm modal
    confirm('Delete this task?').then((ok) => {
      if (!ok) return
      setTasks((prev) => prev.filter((t) => t.id !== taskId))
      showMessage('Task deleted')
    })
  }

  function handleToggleComplete(taskId) {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t)))
  }

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = [...tasks]
    if (q) {
      list = list.filter((t) => (t.title || '').toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q))
    }
    if (filterStatus === 'completed') list = list.filter((t) => t.completed)
    if (filterStatus === 'pending') list = list.filter((t) => !t.completed)
    if (filterPriority !== 'all') list = list.filter((t) => (t.priority || 'low') === filterPriority)

    if (sortBy === 'dueDate') {
      list.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      })
    } else if (sortBy === 'priority') {
      const rank = { high: 0, medium: 1, low: 2 }
      list.sort((a, b) => (rank[a.priority || 'low'] - rank[b.priority || 'low']))
    }

    return list
  }, [tasks, query, filterStatus, filterPriority, sortBy])

  return (
    <div className="tasks-page">
      <header className="tasks-header page-hero">
        <div>
          <p className="eyebrow">Work</p>
          <h1>Tasks</h1>
        </div>
        <div className="actions">
          <button onClick={handleCreate} className="primary">New Task</button>
        </div>
      </header>

      <div className="tasks-controls">
        <input className="search" aria-label="Search tasks" placeholder="Search tasks" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="filter-group">
          <Dropdown
            id="filter-status"
            label="Status"
            value={filterStatus}
            onChange={setFilterStatus}
            options={[{ value: 'all', label: 'All' }, { value: 'pending', label: 'Pending' }, { value: 'completed', label: 'Completed' }]}
            placeholder="Status"
          />
          <Dropdown
            id="filter-priority"
            label="Priority"
            value={filterPriority}
            onChange={setFilterPriority}
            options={[{ value: 'all', label: 'All priorities' }, { value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }]}
            placeholder="Priority"
          />
        </div>
        <Dropdown
          id="sort-by"
          label="Sort"
          value={sortBy}
          onChange={setSortBy}
          options={[{ value: 'dueDate', label: 'Due date' }, { value: 'priority', label: 'Priority' }]}
          placeholder="Sort"
        />
      </div>

      <div className="tasks-content">
        <div className="tasks-list">
          {filteredTasks.length === 0 ? (
            <div className="empty">No tasks match your filters.</div>
          ) : (
            <ul>
              {filteredTasks.map((t) => (
                <li key={t.id}>
                  <TaskItem
                    task={t}
                    subjects={subjects}
                    onEdit={() => handleEdit(t.id)}
                    onDelete={() => handleDelete(t.id)}
                    onToggleComplete={() => handleToggleComplete(t.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="tasks-aside">
          <h3>Manage</h3>
          <div className="aside-section">
            <h4>Subjects</h4>
            {subjects.length === 0 ? (
              <div className="small">No subjects yet.</div>
            ) : (
              <ul>
                {subjects.map((s) => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {(isCreating || editingTask) && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card task-form-wrap">
            <TaskForm
              key={editingTask ? editingTask.id : 'new'}
              task={editingTask}
              subjects={subjects}
              onCancel={() => { setIsCreating(false); setEditingTask(null) }}
              onSave={handleSave}
              onError={showMessage}
            />
          </div>
        </div>
      )}

      {/* toast provider handles toasts */}
    </div>
  )
}

export default Tasks
