import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'
import { useAppSelector } from '../../store'
import {MESSAGE_TEXTS} from '../../constants/consts'

export type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
    endButton?: ReactNode,
};

const Input = forwardRef<HTMLInputElement, TInputProps>(({ value, onChange, className, endButton, ...rest }, ref) => {
    const { isUserTurn } = useAppSelector(state => state.game)
    const { messages } = useAppSelector(state => ({
        messages: state.chat.messages,
    }))

    const getLastRelevantChar = (text: string) => {
        if (!text) return ''
        const lastChar = text[text.length - 1];
        return (lastChar === 'ь' || lastChar === 'ъ') ? text[text.length - 2] : lastChar
    };

    const lastMessage = messages[messages.length - 1]
    const lastChar = lastMessage ? getLastRelevantChar(lastMessage.text) : ''
    const placeholder = lastChar ? `${MESSAGE_TEXTS.know_the_city} "${lastChar.toUpperCase()}"?` : ''

    return (
        <div className="p-2 h-max bg-gray-100 rounded-md w-full flex justify-between items-center">
            <input ref={ref} value={value} onChange={onChange} className='indent-3 outline-none mr-4 flex-1 bg-gray-100' type='text'
                   placeholder={isUserTurn ? placeholder : MESSAGE_TEXTS.competitors_turn} {...rest} />
            {endButton}
        </div>
    )
})

export default Input
