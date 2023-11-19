import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../routes'
import Button from '../../components/button'
import { MESSAGE_TEXTS, rules } from '../../constants/consts'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className='w-full h-full flex items-center justify-center flex-col'>
      <div className='border-b-2 flex w-full p-4 items-center justify-center'>
        <h4 className='font-normal text-lg'>{MESSAGE_TEXTS.game_name}</h4>
      </div>
      <div className='w-full gap-6 flex flex-1 flex-col p-6'>
        <h5>{MESSAGE_TEXTS.game_purpose}</h5>

        <ul className='list-disc p-6'>
          {rules.map((rule, index) => (
            <React.Fragment key={index}>
              <li>{rule}</li>
            </React.Fragment>
          ))}
        </ul>
        <div className='flex justify-center'>
          <Button onClick={() => navigate(Routes.Game)}>
            {MESSAGE_TEXTS.start_game}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage

// E
