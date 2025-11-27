import { useSyncExternalStore } from 'react'
import type { UnknownAction } from '@reduxjs/toolkit'
import type { RootState } from '../shared/state'

type Listener = () => void

let stateCache: RootState | null = null
const listeners = new Set<Listener>()
let initializationPromise: Promise<void> | null = null
let unsubscribeFromMain: (() => void) | null = null

const notifySubscribers = (): void => {
  listeners.forEach((listener) => listener())
}

export const initializeSharedStore = async (): Promise<void> => {
  if (initializationPromise) {
    return initializationPromise
  }

  initializationPromise = window.sharedStore.getState().then((initialState) => {
    stateCache = initialState
    unsubscribeFromMain = window.sharedStore.onStateChange((nextState) => {
      stateCache = nextState
      notifySubscribers()
    })
  })

  return initializationPromise
}

export const disposeSharedStore = (): void => {
  unsubscribeFromMain?.()
  unsubscribeFromMain = null
  stateCache = null
}

const subscribe = (listener: Listener): (() => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const getSnapshot = (): RootState => {
  if (!stateCache) {
    throw new Error('Shared store is not initialized')
  }

  return stateCache
}

export const useSharedSelector = <T>(selector: (state: RootState) => T): T => {
  return useSyncExternalStore(subscribe, () => selector(getSnapshot()))
}

export const dispatchSharedAction = (action: UnknownAction): Promise<void> => {
  return window.sharedStore.dispatch(action)
}
