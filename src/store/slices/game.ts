import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum GameState {
  Idle = 'idle',
  Ended = 'ended',
  InProgress = 'in-progress', 
}

export enum GameResult {
  Won = 'won',
  Lost = 'lost',
  NoResult = 'no-result',
}

export type Game = {
  isUserTurn: boolean;
  gameState: GameState,
  result: GameResult
}  

const initialState: Game = {
  gameState: GameState.Idle,
  isUserTurn: false,
  result: GameResult.NoResult,
}

const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTurn: (state, action: PayloadAction<boolean>) => {
      state.isUserTurn = action.payload
    },
    startGame: (state) => {
      state.gameState = GameState.InProgress
    },
    endGame: (state, action: PayloadAction<GameResult>) => {
      state.gameState = GameState.Ended
      state.result = action.payload
    },
    restart: (state) => {
      state.gameState = GameState.Idle
      state.result = GameResult.NoResult
    }
  },
})

export const { actions: { setTurn, endGame, startGame, restart }, reducer: gameReducer } = game