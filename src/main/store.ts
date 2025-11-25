import { configureStore } from '@reduxjs/toolkit'
import { sharedReducers } from '../shared/state'

export const store = configureStore({
  reducer: sharedReducers
})

