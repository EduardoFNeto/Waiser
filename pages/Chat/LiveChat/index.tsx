import React, { useState, useCallback, useEffect, useContext } from 'react'
import { FlatList } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { Avatar, List } from 'react-native-paper';
import { UserContext } from '../../../contexts/user';


function LiveChat({ navigation }) {
  const [messages, setMessages] = useState<any>([]);
  const [user] = useContext(UserContext)


  useEffect(() => {
    setMessages([
      {
        _id: user.id,
        text: 'Hello developer',
        createdAt: new Date(),
        name: user.name,
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

export default LiveChat;
