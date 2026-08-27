import { useEffect, useRef, useState, useCallback } from 'react'
import storage from '../services/storage'

function nowSeconds() {
  return Math.floor(Date.now() / 1000)
}

// returns { seconds, isRunning, isPaused, start, pause, resume, stop, active }
export default function useStudyTimer() {
  const activeStored = storage.getActiveSession()
  const [active, setActive] = useState(activeStored)
  const [seconds, setSeconds] = useState(() => {
    if (!activeStored) return 0
    const { elapsedBefore = 0, lastTimestamp } = activeStored
    if (lastTimestamp) {
      return elapsedBefore + Math.floor(nowSeconds() - Math.floor(new Date(lastTimestamp).getTime() / 1000))
    }
    return elapsedBefore || 0
  })

  const intervalRef = useRef(null)

  const clearIntervalRef = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    // if active is running (has lastTimestamp) ensure interval
    if (active && active.lastTimestamp && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1)
      }, 1000)
    }
    if ((!active || !active.lastTimestamp) && intervalRef.current) {
      clearIntervalRef()
    }
    return () => {}
  }, [active, clearIntervalRef])

  useEffect(() => {
    // persist active session whenever it changes
    storage.saveActiveSession(active)
  }, [active])

  useEffect(() => {
    return () => clearIntervalRef()
  }, [clearIntervalRef])

  const start = useCallback((subjectId) => {
    if (active && active.lastTimestamp) return // already running
    const now = new Date().toISOString()
    const newActive = {
      subjectId: subjectId || null,
      startedAt: now,
      lastTimestamp: now,
      elapsedBefore: active?.elapsedBefore || 0,
      isPaused: false,
    }
    setActive(newActive)
    setSeconds((active?.elapsedBefore) || 0)
    // start interval
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    }
  }, [active])

  const pause = useCallback(() => {
    if (!active || !active.lastTimestamp) return
    const now = nowSeconds()
    const last = Math.floor(new Date(active.lastTimestamp).getTime() / 1000)
    const newElapsed = (active.elapsedBefore || 0) + Math.max(0, now - last)
    const updated = { ...active, elapsedBefore: newElapsed, lastTimestamp: null, isPaused: true }
    setActive(updated)
    setSeconds(newElapsed)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [active])

  const resume = useCallback(() => {
    if (!active || active.lastTimestamp) return
    const now = new Date().toISOString()
    const updated = { ...active, lastTimestamp: now, isPaused: false }
    setActive(updated)
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    }
  }, [active])

  const stop = useCallback(() => {
    if (!active) return null
    const now = nowSeconds()
    let total = active.elapsedBefore || 0
    if (active.lastTimestamp) {
      const last = Math.floor(new Date(active.lastTimestamp).getTime() / 1000)
      total += Math.max(0, now - last)
    }
    // build completed session
    const session = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      subjectId: active.subjectId || null,
      durationSeconds: total,
      startedAt: active.startedAt,
      completedAt: new Date().toISOString(),
    }
    // clear active and interval
    setActive(null)
    storage.saveActiveSession(null)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setSeconds(0)
    return session
  }, [active])

  const isRunning = !!(active && active.lastTimestamp)
  const isPaused = !!(active && active.isPaused)

  return { seconds, isRunning, isPaused, start, pause, resume, stop, active }
}
