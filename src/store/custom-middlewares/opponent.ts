import { Dispatch, Middleware } from '@reduxjs/toolkit'
import { RootState } from '..'
import { sendMessage } from '../slices/chat'
import { GameResult, endGame, setTurn } from '../slices/game'

const opponentMiddleware: Middleware<Dispatch, RootState> = store => next => action => {
  next(action);

  if (setTurn.match(action) && !action.payload) {
    setTimeout(() => processBotTurn(store), 2000)
  }
}

const processBotTurn = (store: any) => {
  const { cities, chat } = store.getState()
  const lastMessage = chat.messages[chat.messages.length - 1]?.text

  const nextCity = getNextCity(cities.collection, lastMessage)

  if (nextCity) {
    store.dispatch(sendMessage({ text: nextCity, userMessage: false }))
  } else {
    store.dispatch(endGame(GameResult.Won))
  }
}

const getNextCity = (cities: string[], lastMessage: string | undefined) => {
  if (!lastMessage) {
    return cities[Math.floor(Math.random() * cities.length)]
  }

  const lastChar = getLastChar(lastMessage)
  return cities.find(city => city[0].toLowerCase() === lastChar)
};

const getLastChar = (word: string) => {
  const lastChar = word[word.length - 1].toLowerCase()
  return ['ь', 'ъ'].includes(lastChar) ? word[word.length - 2].toLowerCase() : lastChar
}
export default opponentMiddleware


