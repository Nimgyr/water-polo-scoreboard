import { scoreboardSlice } from './scoreboardSlice'

export const sharedReducers = {
  scoreboard: scoreboardSlice.reducer
}

export type RootState = {
  scoreboard: ReturnType<typeof scoreboardSlice.reducer>
}

export { scoreboardSlice }
