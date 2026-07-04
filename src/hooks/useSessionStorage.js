import { useEffect, useState } from 'react'

export function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = sessionStorage.getItem(key)
      return savedValue ? JSON.parse(savedValue) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
