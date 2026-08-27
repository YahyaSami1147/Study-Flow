import { useEffect, useRef, useState, useCallback } from 'react'
import storage, { ACTIVE_SESSION_KEY } from '../services/storage'
import { makeId } from '../lib/id'

function nowSeconds() {
  return Math.floor(Date.now() / 1000)
}

// returns { seconds, isRunning, isPaused, start, pause, resume, stop, active }
export default function useStudyTimer() {
  const activeStored = storage.getActiveSession()
  const [active, setActive] = useState(activeStored)
  const activeRef = useRef(activeStored)

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
    // keep ref updated
    activeRef.current = active
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
    // prevent starting if already running
    if (activeRef.current && activeRef.current.lastTimestamp) return
    const now = new Date().toISOString()
    const newActive = {
      subjectId: subjectId || null,
      startedAt: now,
      lastTimestamp: now,
      elapsedBefore: activeRef.current?.elapsedBefore || 0,
      isPaused: false,
    }
    activeRef.current = newActive
    setActive(newActive)
    setSeconds(activeRef.current?.elapsedBefore || 0)
    // start interval
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    }
  }, [])

  const pause = useCallback(() => {
    const current = activeRef.current
    if (!current || !current.lastTimestamp) return
    const now = nowSeconds()
    const last = Math.floor(new Date(current.lastTimestamp).getTime() / 1000)
    const newElapsed = (current.elapsedBefore || 0) + Math.max(0, now - last)
    const updated = { ...current, elapsedBefore: newElapsed, lastTimestamp: null, isPaused: true }
    activeRef.current = updated
    setActive(updated)
    setSeconds(newElapsed)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const resume = useCallback(() => {
    const current = activeRef.current
    if (!current || current.lastTimestamp) return
    const now = new Date().toISOString()
    const updated = { ...current, lastTimestamp: now, isPaused: false }
    activeRef.current = updated
    setActive(updated)
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    }
  }, [])

  const stop = useCallback(() => {
    const current = activeRef.current
    if (!current) return null
    const now = nowSeconds()
    let total = current.elapsedBefore || 0
    if (current.lastTimestamp) {
      const last = Math.floor(new Date(current.lastTimestamp).getTime() / 1000)
      total += Math.max(0, now - last)
    }
    // build completed session
    const session = {
      id: makeId(),
      subjectId: current.subjectId || null,
      durationSeconds: total,
      startedAt: current.startedAt,
      completedAt: new Date().toISOString(),
    }
    // clear active and interval
    activeRef.current = null
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
