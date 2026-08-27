import ThemeToggle from '../components/ui/ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import '../styles/settings.css'

function Settings() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="settings-page">
      <header className="settings-header page-hero">
        <p className="eyebrow">Preferences</p>
        <h1>Settings</h1>
        <p className="lede">Appearance is saved on this device.</p>
      </header>

      <section className="settings-card">
        <div className="settings-row">
          <div className="settings-copy">
            <h2>Theme</h2>
            <p>Paper by day, espresso by night.</p>
          </div>
          <ThemeToggle size="lg" />
        </div>

        <div className="theme-choices">
          <button
            type="button"
            className={`theme-choice ${theme === 'light' ? 'is-active' : ''}`}
            onClick={() => setTheme('light')}
            aria-pressed={theme === 'light'}
          >
            <strong>Light</strong>
            <span>Warm paper, ink, and brass — for daytime work.</span>
          </button>
          <button
            type="button"
            className={`theme-choice ${theme === 'dark' ? 'is-active' : ''}`}
            onClick={() => setTheme('dark')}
            aria-pressed={theme === 'dark'}
          >
            <strong>Dark</strong>
            <span>Espresso surfaces for longer evening sessions.</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export default Settings
