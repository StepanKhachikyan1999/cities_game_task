import { combineReducers } from '@reduxjs/toolkit'

import { chatReducer } from './slices/chat';
import { gameReducer } from './slices/game';
import { citiesReducer } from './slices/cities';

const rootReducer = combineReducers({
  chat: chatReducer,
  game: gameReducer,
  cities: citiesReducer,
})

export default rootReducer;