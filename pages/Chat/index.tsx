import React, { useState, useCallback, useEffect, useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { UserContext } from '../../contexts/user';



function Chat({ navigation }) {
  const [messages, setMessages] = useState<any>([]);
  const [user] = useContext(UserContext)

  useEffect(() => {
    setMessages([
      {
        _id: user.id,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: user.avatar,
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showAvatarForEveryMessage={true}
      user={{
        _id: user.id,
        name: user.username,
        avatar: user.avatar
      }}
    />
  )
}

export default Chat;

