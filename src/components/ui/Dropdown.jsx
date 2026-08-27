import React, { useState, useRef, useEffect, useCallback } from 'react'
import '../../styles/dropdown.css'

export default function Dropdown({ label, value, onChange, options = [], placeholder = 'Select', id }) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const btnRef = useRef(null)
  const menuRef = useRef(null)

  const [closing, setClosing] = useState(false)
  const handleToggle = useCallback(() => {
    if (open) {
      // start closing animation
      setClosing(true)
      setTimeout(() => {
        setClosing(false)
        setOpen(false)
      }, 180)
    } else {
      setOpen(true)
    }
  }, [open])
  const close = useCallback(() => {
    if (!open) return
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      setOpen(false)
    }, 180)
  }, [open])

  useEffect(() => {
    function onDoc(e) {
      if (!menuRef.current) return
      if (menuRef.current.contains(e.target) || btnRef.current?.contains(e.target)) return
      close()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [close])

  useEffect(() => {
    if (open) {
      const selIndex = options.findIndex((o) => o.value === value)
      setHighlight(selIndex >= 0 ? selIndex : -1)
    }
  }, [open, options, value])

  function selectOption(opt) {
    onChange(opt.value)
    close()
    btnRef.current?.focus()
  }

  function onKeyDown(e) {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
        return
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, options.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
      return
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (highlight >= 0 && highlight < options.length) selectOption(options[highlight])
      return
    }
  }

  useEffect(() => {
    if (open && highlight >= 0 && menuRef.current) {
      const node = menuRef.current.querySelectorAll('[role="option"]')[highlight]
      node?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlight, open])

  const selected = options.find((o) => o.value === value)

  return (
    <div className="dropdown">
      <label className="dropdown-label">{label}</label>
      <button
        ref={btnRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label || placeholder}
        className="dropdown-button"
        onClick={handleToggle}
        onKeyDown={onKeyDown}
      >
        <span className="dropdown-value">{selected ? selected.label : placeholder}</span>
        <span className="dropdown-caret" aria-hidden>▾</span>
      </button>

      {(open || closing) && (
        <div ref={menuRef} className={`dropdown-menu ${closing ? 'is-closing' : 'is-open'}`} role="listbox" tabIndex={-1} onKeyDown={onKeyDown}>
          {options.map((opt, i) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              tabIndex={-1}
              className={`dropdown-option ${i === highlight ? 'is-highlight' : ''} ${opt.value === value ? 'is-selected' : ''}`}
              onMouseEnter={() => setHighlight(i)}
              onClick={() => selectOption(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
