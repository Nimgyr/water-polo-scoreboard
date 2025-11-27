import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TeamKey = 'home' | 'guest'

export interface ScoreboardState {
  home: number
  guest: number
}

const initialState: ScoreboardState = {
  home: 0,
  guest: 0
}

export const scoreboardSlice = createSlice({
  name: 'scoreboard',
  initialState,
  reducers: {
    goalScored(state, action: PayloadAction<{ team: TeamKey; amount?: number }>) {
      const { team, amount = 1 } = action.payload
      state[team] += amount
    },
    resetScores() {
      return { ...initialState }
    },
    setScores(state, action: PayloadAction<ScoreboardState>) {
      state.home = action.payload.home
      state.guest = action.payload.guest
    }
  }
})
