import { useState, useEffect, useCallback } from 'react'

function isValidStoredValue(value, fallback) {
  if (value == null) return false
  if (Array.isArray(fallback)) return Array.isArray(value)
  if (typeof fallback === 'object') return typeof value === 'object' && !Array.isArray(value)
  return true
}

export default function useLocalStorage(key, initialValue) {
  const read = useCallback(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw == null) return initialValue

      const parsed = JSON.parse(raw)
      if (!isValidStoredValue(parsed, initialValue)) {
        return initialValue
      }

      return parsed
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [state, setState] = useState(read)

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // ignore storage errors
    }
  }, [key, state])

  useEffect(() => {
    function handler(e) {
      if (e.key === key) {
        setState(read())
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [key, read])

  return [state, setState]
}
