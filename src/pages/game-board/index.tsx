import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Chat from '../../components/chat'
import MessageInput from '../../components/message-input'
import { useAppDispatch, useAppSelector } from '../../store'
import { GameResult, GameState, endGame, setTurn } from '../../store/slices/game'
import { useTimer } from '../../hooks/useTimer'
import { Routes } from '../../routes'
import { MESSAGE_TEXTS } from '../../constants/consts'

const Game = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isUserTurn, gameState } = useAppSelector(state => state.game)


  const onTimeFinish = () => {
    dispatch(endGame(isUserTurn ? GameResult.Lost : GameResult.Won))
  };

  const { time, start: startTimer, reset: resetTimer, timePassedInPercent } = useTimer({
    onFinish: onTimeFinish,
  });

  useEffect(() => {
    const isUserFirstTurn = Math.random() > 0.5;
    dispatch(setTurn(isUserFirstTurn));
  }, [dispatch]);

  useEffect(() => {
    if (gameState === GameState.Ended) {
      navigate(Routes.GameFinished);
    }
  }, [gameState, navigate]);

  useEffect(() => {
    resetTimer();
    startTimer();
  }, [isUserTurn, resetTimer, startTimer]);

  const turnMessage = isUserTurn ? MESSAGE_TEXTS.your_turn_now : MESSAGE_TEXTS.opponent_turn_now;
  const progressBarWidth = `${timePassedInPercent}%`;

  return (
      <div className="h-96 w-full flex flex-col items-center justify-between xs:h-app-max">
        <div className="w-full flex items-center p-6 justify-between">
          <h4>{turnMessage}</h4>
          <h3 className="font-medium">{time}</h3>
        </div>
        <div className="w-full bg-slate-100">
          <hr
              style={{ width: progressBarWidth }}
              className={`self-start h-2 bg-violet-300 transition-[width] duration-${timePassedInPercent === 100 ? 0 : 1000}`} />
        </div>
        <Chat />
        <MessageInput />
      </div>
  );
};

export default Game
