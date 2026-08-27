import React, { createContext, useContext, useCallback, useState } from 'react'
import '../../styles/toast.css'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const show = useCallback((text, opts = {}) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
    const t = { id, text, closing: false }
    setToasts((s) => [...s, t])
    if (!opts.persistent) setTimeout(() => {
      // start closing animation
      setToasts((s) => s.map((x) => (x.id === id ? { ...x, closing: true } : x)))
      setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 260)
    }, opts.duration || 3000)
    return id
  }, [])

  const remove = useCallback((id) => {
    // trigger closing animation
    setToasts((s) => s.map((x) => (x.id === id ? { ...x, closing: true } : x)))
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 260)
  }, [])

  return (
    <ToastContext.Provider value={{ show, remove }}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div key={t.id} className={`toast-item ${t.closing ? 'is-closing' : 'is-open'}`}>{t.text}</div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
