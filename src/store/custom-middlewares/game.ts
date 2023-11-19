import { Dispatch, Middleware } from '@reduxjs/toolkit'
import { RootState } from '..'
import { sendMessage } from '../slices/chat'
import { setTurn } from '../slices/game'
import { removeCity } from '../slices/cities'

const gameMiddleware: Middleware<Dispatch, RootState> = (store) => (next) => (action) => {
  next(action)

  if (sendMessage.match(action)) {
    store.dispatch(removeCity(action.payload.text))

    setTimeout(() => {
      store.dispatch(setTurn(!action.payload.userMessage))
    }, 100)
  }

}

export default gameMiddleware