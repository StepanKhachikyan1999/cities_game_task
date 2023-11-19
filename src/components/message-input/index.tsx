import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Send } from 'lucide-react'
import Input from '../input'
import Button from '../button'
import { useAppDispatch, useAppSelector } from '../../store'
import validatorScheme from '../../helpers/validation'
import { sendMessage } from '../../store/slices/chat'

export type MessageForm = {
  message: string;
};

const MessageInput = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageForm>({
    resolver: yupResolver(validatorScheme),
    mode: 'onChange',
    defaultValues: {
      message: ''
    }
  });

  const dispatch = useAppDispatch()
  const { isUserTurn } = useAppSelector(state => state.game)

  const onSend = (values: MessageForm) => {
    dispatch(sendMessage({ text: values.message, userMessage: true }))
    reset()
  };

  return (
      <div className="p-4 flex w-full justify-between items-center">
        <form className="w-full" onSubmit={handleSubmit(onSend)}>
          <Input
              id="messageBox"
              disabled={!isUserTurn}
              endButton={
                <Button type="submit" disabled={!isUserTurn}>
                  <Send />
                </Button>
              }
              {...register('message')}
          />
          {errors.message?.message && <label className="text-red-700 text-xs" htmlFor="messageBox">{errors.message?.message}</label>}
        </form>
      </div>
  );
};

export default MessageInput
