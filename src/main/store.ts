import { configureStore } from '@reduxjs/toolkit'
import { sharedReducers } from '../renderer/src/shared/state'

export const store = configureStore({
  reducer: sharedReducers
})
