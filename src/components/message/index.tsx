import { forwardRef, ReactNode } from 'react'

export type MessageProps = {
  text: ReactNode
  userMessage: boolean
  className?: string
}

const Message = forwardRef<HTMLDivElement, MessageProps>(({ text, userMessage }, ref) => {
  return (
    <div className={`
    flex  
    w-max 
    py-2 px-6 
    rounded-xl
    ${userMessage ? 'self-end' : 'self-start'}
    ${userMessage ? 'text-white' : 'text-gray-700'} 
    ${userMessage ? 'bg-violet-500' : 'bg-violet-100'} 
    ${userMessage ? 'rounded-br-none' : 'rounded-bl-none'}`}
    ref={ref}>
      {text}
    </div>
  )
})

export default Message