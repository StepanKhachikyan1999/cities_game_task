import { useEffect, useRef } from 'react'

import { useAppSelector } from '../../store'
import Message from '../message'
import { MESSAGE_TEXTS } from '../../constants/consts'

const Chat = () => {

  const lastMessageRef = useRef<null | HTMLDivElement>(null)

  const { messages, messagesCount } = useAppSelector(state => state.chat)

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [messages.length])
  
  return (
    <div className="w-full flex-1 justify-between flex flex-col p-4 overflow-y-auto gap-2 relative pb-0">
      <div className='flex flex-1 w-full flex-col'>
        {
          messages.map((message, index, array) => (
            <Message ref={index === array.length - 1 ? lastMessageRef : null} userMessage={message.userMessage} text={message.text} key={message.id} />
          ))
        }
      </div>
      {!!messagesCount ? (
          <p className='text-sm w-full flex items-end justify-center text-gray-400'>{ MESSAGE_TEXTS.total_cities_listed } : { messagesCount }</p>
      ) : <></>}
    </div>
  )
}

export default Chat