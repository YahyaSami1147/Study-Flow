import { useId } from 'react'
import { useTheme } from '../../context/ThemeContext'
import '../../styles/theme-toggle.css'

function ThemeToggle({ size = 'md' }) {
  const { isDark, toggleTheme } = useTheme()
  const uid = useId().replace(/:/g, '')

  return (
    <button
      type="button"
      className={`theme-toggle theme-toggle-${size} ${isDark ? 'is-dark' : 'is-light'}`}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle-sky" aria-hidden="true">
        <span className="theme-toggle-stars">
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="theme-toggle-cloud c1" />
        <span className="theme-toggle-cloud c2" />
        <span className="theme-toggle-knob">
          <svg className="celestial" viewBox="0 0 32 32" fill="none">
            <g className="sun-group">
              <g className="sun-rays" stroke="#F4C430" strokeWidth="1.7" strokeLinecap="round">
                <line x1="16" y1="2.2" x2="16" y2="6.2" />
                <line x1="16" y1="25.8" x2="16" y2="29.8" />
                <line x1="2.2" y1="16" x2="6.2" y2="16" />
                <line x1="25.8" y1="16" x2="29.8" y2="16" />
                <line x1="6.2" y1="6.2" x2="9.1" y2="9.1" />
                <line x1="22.9" y1="22.9" x2="25.8" y2="25.8" />
                <line x1="25.8" y1="6.2" x2="22.9" y2="9.1" />
                <line x1="9.1" y1="22.9" x2="6.2" y2="25.8" />
              </g>
              <circle className="sun-core" cx="16" cy="16" r="7.2" />
            </g>
            <g className="moon-group">
              <mask id={`moon-mask-${uid}`}>
                <rect width="32" height="32" fill="white" />
                <circle className="moon-cut" cx="21.5" cy="11" r="8.4" fill="black" />
              </mask>
              <circle
                className="moon-body"
                cx="16"
                cy="16"
                r="9"
                mask={`url(#moon-mask-${uid})`}
              />
            </g>
          </svg>
        </span>
      </span>
    </button>
  )
}

export default ThemeToggle
