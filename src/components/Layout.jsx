import { NavLink, Outlet } from 'react-router-dom'
import '../styles/layout.css'
import { ConfirmProvider } from './ui/ConfirmModal'
import ThemeToggle from './ui/ThemeToggle'

const links = [
  {
    to: '/',
    end: true,
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="9" rx="1.6" />
        <rect x="14" y="3" width="7" height="5" rx="1.6" />
        <rect x="14" y="12" width="7" height="9" rx="1.6" />
        <rect x="3" y="16" width="7" height="5" rx="1.6" />
      </svg>
    ),
  },
  {
    to: '/tasks',
    label: 'Tasks',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 6h11M9 12h11M9 18h11" />
        <path d="M4 6h.01M4 12h.01M4 18h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/notes',
    label: 'Notes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 3h8l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M15 3v5h5M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    to: '/sessions',
    label: 'Study Sessions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 1.5M9 3h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/subjects',
    label: 'Subjects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19a2 2 0 0 0 2 2h14V5H6a2 2 0 0 0-2 2z" />
        <path d="M4 19V7" />
        <path d="M8 9h8M8 13h6" />
      </svg>
    ),
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.2 6.2l1.4 1.4M16.4 16.4l1.4 1.4M17.8 6.2l-1.4 1.4M7.6 16.4l-1.4 1.4" />
      </svg>
    ),
  },
]

function Layout() {
  return (
    <ConfirmProvider>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <path
                  d="M7 24c6-9 8-9 18-15"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="21" r="3.2" fill="currentColor" />
                <circle cx="22" cy="11" r="2.2" fill="currentColor" opacity="0.55" />
              </svg>
            </span>
            <span className="wordmark">StudyFlow</span>
          </div>
          <nav className="top-actions" aria-label="Appearance">
            <ThemeToggle size="lg" />
            <button className="profile-btn" title="Account" aria-label="Account">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5z"/><path d="M4 22c0-3.3 4.3-6 8-6s8 2.7 8 6"/></svg>
            </button>
          </nav>
        </header>

        <div className="main-area">
          <aside className="sidebar">
            <ul>
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.end}>
                    {link.icon}
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </aside>

          <main className="content">
            <Outlet />
          </main>
        </div>
      </div>
    </ConfirmProvider>
  )
}

export default Layout
