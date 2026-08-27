import { useMemo } from 'react'
import StatCard from '../components/stats/StatCard'
import RecentList from '../components/dashboard/RecentList'
import storage, { TASKS_KEY, SUBJECTS_KEY, SESSIONS_KEY } from '../services/storage'
import useLocalStorage from '../hooks/useLocalStorage'
import '../styles/dashboard.css'

function formatMinutes(total) {
  if (!total) return '0m'
  const hrs = Math.floor(total / 60)
  const mins = total % 60
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
}

function Dashboard() {
  const [tasks] = useLocalStorage(TASKS_KEY, storage.getTasks())
  const [subjects] = useLocalStorage(SUBJECTS_KEY, storage.getSubjects())
  const [sessions] = useLocalStorage(SESSIONS_KEY, storage.getSessions())

  const stats = useMemo(() => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((t) => t.completed).length
    const pendingTasks = totalTasks - completedTasks

    // study time in minutes — prefer durationSeconds, fallback to durationMinutes or start/end
    const totalStudyMinutes = sessions.reduce((sum, s) => {
      if (s.durationSeconds != null) return sum + Number(s.durationSeconds) / 60
      if (s.durationMinutes != null) return sum + Number(s.durationMinutes)
      if (s.startedAt && s.completedAt) {
        const start = new Date(s.startedAt)
        const end = new Date(s.completedAt)
        const mins = Math.max(0, Math.round((end - start) / 60000))
        return sum + mins
      }
      return sum
    }, 0)

    // active subjects = subjects that have tasks or sessions
    const subjectIdsWithActivity = new Set()
    tasks.forEach((t) => t.subjectId && subjectIdsWithActivity.add(t.subjectId))
    sessions.forEach((s) => s.subjectId && subjectIdsWithActivity.add(s.subjectId))
    const activeSubjects = Array.from(subjectIdsWithActivity).length

    // recent tasks (by createdAt or updatedAt)
    const recentTasks = [...tasks]
      .sort((a, b) => {
        const ta = new Date(a.updatedAt || a.createdAt || 0).getTime()
        const tb = new Date(b.updatedAt || b.createdAt || 0).getTime()
        return tb - ta
      })
      .slice(0, 6)

    const now = Date.now()
    const upcomingTasks = tasks
      .filter((t) => t.dueDate && new Date(t.dueDate).getTime() >= now && !t.completed)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 6)

    const recentSessions = [...sessions]
      .sort((a, b) => new Date(b.end || b.start || 0) - new Date(a.end || a.start || 0))
      .slice(0, 6)

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      totalStudyMinutes,
      activeSubjects,
      recentTasks,
      upcomingTasks,
      recentSessions,
    }
  }, [tasks, sessions, subjects])

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="muted">Overview of your study productivity</p>
      </header>

      <section className="stats-grid" aria-hidden={false}>
        <StatCard title="Total Tasks" value={stats.totalTasks} />
        <StatCard title="Completed" value={stats.completedTasks} />
        <StatCard title="Pending" value={stats.pendingTasks} />
        <StatCard title="Study Time" value={formatMinutes(stats.totalStudyMinutes)} />
        <StatCard title="Active Subjects" value={stats.activeSubjects} />
        <div className="progress-card">
          <div className="stat-title">Productivity</div>
          <div aria-hidden>
            <progress
              max={Math.max(1, stats.totalTasks)}
              value={stats.completedTasks}
              className="progress"
            />
          </div>
          <div className="stat-sub">
            {stats.completedTasks} of {stats.totalTasks} tasks completed
          </div>
        </div>
      </section>

      <section className="lists">
        <RecentList
          title="Recent Tasks"
          items={stats.recentTasks}
          emptyMessage="No tasks yet. Create your first task."
          renderItem={(t) => (
            <div>
              <strong>{t.title}</strong>
              {t.dueDate && (
                <div className="small">Due {new Date(t.dueDate).toLocaleString()}</div>
              )}
            </div>
          )}
        />

        <RecentList
          title="Upcoming Tasks"
          items={stats.upcomingTasks}
          emptyMessage="No upcoming tasks."
          renderItem={(t) => (
            <div>
              <strong>{t.title}</strong>
              <div className="small">Due {new Date(t.dueDate).toLocaleString()}</div>
            </div>
          )}
        />

        <RecentList
          title="Recent Sessions"
          items={stats.recentSessions}
          emptyMessage="No study sessions tracked yet."
          renderItem={(s) => (
            <div>
              <strong>{s.subjectName || 'General'}</strong>
              <div className="small">{formatMinutes(s.durationMinutes || 0)}</div>
            </div>
          )}
        />
      </section>
    </div>
  )
}

export default Dashboard
