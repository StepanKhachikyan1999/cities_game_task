import { GameResult } from '../../store/slices/game'

export const TEXTS = {
  [GameResult.Won]: {
    title: 'Поздравляем тебя с победой! Твой противник не вспомнил нужный город!'
  },
  [GameResult.Lost]: {
    title: 'К сожалению твое время вышло! Твой противник победил!'
  },
  [GameResult.NoResult]: {
    title: 'Нет результатов !'
  },
}