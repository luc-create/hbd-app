import { useEffect, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type Initializer<T> = T | (() => T)

const isFunction = <T,>(value: Initializer<T>): value is () => T =>
  typeof value === 'function'

const resolveInitializer = <T,>(value: Initializer<T>): T =>
  isFunction(value) ? value() : value

export function useLocalStorageState<T>(
  key: string,
  initialValue: Initializer<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const initialRef = useRef(initialValue)

  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return resolveInitializer(initialRef.current)
    }

    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) {
        return JSON.parse(stored) as T
      }
    } catch (error) {
      console.warn(`useLocalStorageState: failed to parse value for "${key}"`, error)
    }

    return resolveInitializer(initialRef.current)
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.warn(`useLocalStorageState: failed to store value for "${key}"`, error)
    }
  }, [key, state])

  return [state, setState]
}

