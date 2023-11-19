import store from '../store'

export const checkIsValid = (value: string) => {
    const lastMessage = store.getState().chat.messages[store.getState().chat.messages.length - 1]?.text

    if (!lastMessage) return true

    const lastLetter: string = lastMessage[lastMessage.length - 1] === 'ь' ||  lastMessage[lastMessage.length - 1] === 'ъ' ? lastMessage[lastMessage.length - 2] : lastMessage[lastMessage.length - 1]

    return lastLetter.toLowerCase() === value[0]?.toLowerCase()
}