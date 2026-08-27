import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../styles/layout.css'

function Layout() {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('theme-dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('theme-dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">StudyFlow</div>
        <nav className="top-actions">
          <button
            aria-pressed={isDark}
            onClick={() => setIsDark((s) => !s)}
            className="theme-toggle"
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
        </nav>
      </header>

      <div className="main-area">
        <aside className="sidebar">
          <ul>
            <li>
              <NavLink to="/" end>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/tasks">Tasks</NavLink>
            </li>
            <li>
              <NavLink to="/notes">Notes</NavLink>
            </li>
            <li>
              <NavLink to="/sessions">Study Sessions</NavLink>
            </li>
            <li>
              <NavLink to="/subjects">Subjects</NavLink>
            </li>
            <li>
              <NavLink to="/settings">Settings</NavLink>
            </li>
          </ul>
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
