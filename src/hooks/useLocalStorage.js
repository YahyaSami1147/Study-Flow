import { useState, useEffect, useCallback } from 'react'

export default function useLocalStorage(key, initialValue) {
  const read = useCallback(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
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
