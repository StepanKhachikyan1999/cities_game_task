import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import gameMiddleware from './custom-middlewares/game'
import opponentMiddleware from './custom-middlewares/opponent'

const store = configureStore({
  reducer: rootReducer,
  middleware: [gameMiddleware, opponentMiddleware],
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof rootReducer>


export default store