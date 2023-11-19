import { useReducer, useCallback, useEffect } from 'react'

export type TimerHookProps = {
  isCountDown?: boolean
  onFinish?: () => void
}

type TimerState = {
  time: string;
  timePassedInPercent: number
  isActive: boolean
  endDate: number
}

type TimerAction =
    | { type: 'START' | 'STOP' }
    | { type: 'RESET'; seconds: number }
    | { type: 'TICK'; time: string; percent: number }

const initialState: TimerState = {
  time: '',
  timePassedInPercent: 100,
  isActive: false,
  endDate: Date.now(),
}

const seconds = 120

const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'START':
      return { ...state, isActive: true }
    case 'STOP':
      return { ...state, isActive: false }
    case 'RESET':
      return { ...initialState, isActive: true, endDate: Date.now() + action.seconds * 1000 };
    case 'TICK':
      return { ...state, time: action.time, timePassedInPercent: action.percent }
    default:
      return state
  }
};

export const useTimer = ({ isCountDown = true, onFinish }: TimerHookProps) => {
  const [state, dispatch] = useReducer(timerReducer, {
    ...initialState,
    endDate: Date.now() + seconds * 1000,
  })

  const tick = () => {
    if (isCountDown) {
      const timeLeft = state.endDate - Date.now()
      const minutesLeft = String(Math.floor(timeLeft / 60000)).padStart(2, '0')
      const secondsLeft = String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0')
      const time = `${minutesLeft}:${secondsLeft}`
      const percent = Math.ceil((timeLeft / 1000 / seconds) * 100)

      if (timeLeft <= 0) {
        dispatch({ type: 'STOP' })
        onFinish && onFinish()
      } else {
        dispatch({ type: 'TICK', time, percent })
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (state.isActive) {
      interval = setInterval(tick, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    };
  }, [state.isActive, tick]);

  const start = useCallback(() => dispatch({ type: 'START' }), [])
  const stop = useCallback(() => dispatch({ type: 'STOP' }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET', seconds }), [])

  return {
    ...state,
    start,
    stop,
    reset,
  };
};
