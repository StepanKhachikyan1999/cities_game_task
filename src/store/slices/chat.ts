import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { restart } from './game'
import {generateUniqueId} from '../../helpers/generateUniqueId'

export type Message = {
  text: string
  userMessage: boolean
  id: string
  timestamp?: Date
}

export type Chat = {
  messagesCount: number
  messages: Message[]
}

export type SendMessagePayload = {
  userMessage: boolean
  text: string
}

const initialState: Chat = {
  messages: [],
  messagesCount: 0,
}

const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: {
      prepare: (payload: SendMessagePayload) => {
        // Using a helper function for ID generation
        const id = generateUniqueId()
        const timestamp = new Date()
        return { payload: { ...payload, id, timestamp } }
      },
      reducer: (state, action: PayloadAction<SendMessagePayload & { id: string; timestamp: Date }>) => {
        state.messagesCount++;
        state.messages.push(action.payload);
      }
    },
  },
  extraReducers: {
    [restart.type]: (state) => {
      state.messagesCount = 0
      state.messages = []
    }
  }
})

export const { actions: { sendMessage }, reducer: chatReducer } = chat
