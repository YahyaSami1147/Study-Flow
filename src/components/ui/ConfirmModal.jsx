import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import '../../styles/confirm.css'

const ConfirmContext = createContext(null)

export function ConfirmProvider({ children }) {
  const [state, setState] = useState({ open: false, message: '', resolve: null })
  const prevActive = useRef(null)
  const cardRef = useRef(null)

  const confirm = useCallback((message) => {
    return new Promise((res) => {
      setState({ open: true, message, resolve: res })
    })
  }, [])

  const handleClose = (value) => {
    if (state.resolve) state.resolve(value)
    setState({ open: false, message: '', resolve: null })
  }

  useEffect(() => {
    if (!state.open) {
      // restore focus to previously focused element
      if (prevActive.current && prevActive.current.focus) prevActive.current.focus()
      return
    }

    // save previously focused element
    prevActive.current = document.activeElement

    // focus first focusable element in the modal
    const focusable = cardRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || []
    if (focusable.length) focusable[0].focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose(false)
      } else if (e.key === 'Tab') {
        // simple focus trap
        const nodes = Array.from(focusable)
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [state.open])
  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state.open && (
        <div className="confirm-backdrop" role="dialog" aria-modal="true">
          <div className="confirm-card" ref={cardRef}>
            <div className="confirm-message">{state.message}</div>
            <div className="confirm-actions">
              <button type="button" className="btn-ghost" onClick={() => handleClose(false)}>Cancel</button>
              <button type="button" className="primary" onClick={() => handleClose(true)}>OK</button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error('useConfirm must be used within ConfirmProvider')
  return ctx.confirm
}
