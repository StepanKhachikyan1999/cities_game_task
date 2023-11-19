import { createBrowserRouter } from "react-router-dom"
import App from "./App"

import HomePage from './pages/homepage'
import Game from './pages/game-board'
import GameFinished from './pages/game-finished'

export enum Routes {
  Home = '/',
  Game = '/game',
  GameFinished = '/game-finished',
}

export const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: Routes.Game,
        element: <Game />
      },
      {
        path: Routes.GameFinished,
        element: <GameFinished />
      }
    ]
  },
]);