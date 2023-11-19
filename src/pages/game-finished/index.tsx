import React, { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../routes'
import { useAppDispatch, useAppSelector } from '../../store'
import { GameResult, restart } from '../../store/slices/game'
import Button from '../../components/button'
import { TEXTS } from './constants'
import { MESSAGE_TEXTS } from '../../constants/consts'

interface GameFinishedTitleProps {
  result: GameResult
}

const GameFinishedTitle: React.FC<GameFinishedTitleProps> = ({ result }) => {
  return <h4 className='font-normal text-lg'>{TEXTS[result].title}</h4>
}

interface GameFinishedMessageProps {
  result: GameResult
  messagesCount: number
}

const GameFinishedMessage: React.FC<GameFinishedMessageProps> = ({ result, messagesCount }) => {
  const messageClass = useMemo(() => 
    `${result === GameResult.Won ? 'text-success' : 'text-error'} text-3xl text-center`,
    [result]
  )
  return (
    <h2 className={messageClass}>
      {MESSAGE_TEXTS.time_finished}
    </h2>
  )
}

interface GameFinishedStatsProps {
  messagesCount: number
}

const GameFinishedStats: React.FC<GameFinishedStatsProps> = ({ messagesCount }) => (
  <div>
    <p className='text-center'>{MESSAGE_TEXTS.total_cities_listed}: {messagesCount} </p>
    <p className='text-center'>
      {messagesCount > 3 ? MESSAGE_TEXTS.good_result : MESSAGE_TEXTS.bad_result}
    </p>
  </div>
)

const GameFinished: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { result, messages, messagesCount } = useAppSelector(state => ({
    result: state.game.result,
    messages: state.chat.messages,
    messagesCount: state.chat.messagesCount
  }))

  const playAgain = useCallback(() => {
    navigate(Routes.Game)
    dispatch(restart())
  }, [dispatch, navigate])

  return (
    <div className='w-full h-full flex items-center justify-center flex-col'>
      <div className='border-b-2 flex w-full p-4 items-center justify-center'>
        <GameFinishedTitle result={result} />
      </div>
      <div className='w-full gap-12 flex flex-1 flex-col p-6'>
        <GameFinishedMessage result={result} messagesCount={messagesCount} />
        <GameFinishedStats messagesCount={messagesCount} />

        {
          messagesCount > 0 && (
              <>
                <p className='text-center'>{MESSAGE_TEXTS.last_city_named_winner}</p>
                <h4 className='font-normal text-2xl text-slate-900 text-center'>
                  {messages[messagesCount - 1].text}
                </h4>
              </>
          )
        }
        
        <div className='flex justify-center bg-violet-600'>
          <Button onClick={playAgain}>
            {MESSAGE_TEXTS.play_again}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameFinished