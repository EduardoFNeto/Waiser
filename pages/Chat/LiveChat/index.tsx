import { useRoute } from '@react-navigation/native';
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { FlatList, View } from 'react-native';
import { GiftedChat,Bubble,InputToolbar} from 'react-native-gifted-chat'
import { Avatar, List } from 'react-native-paper';
import { UserContext } from '../../../contexts/user';
import { Message } from '../../../models/message';
import { chatService } from '../../../services/api/chat';


function LiveChat({ navigation }) {
  const [messages, setMessages] = useState<any>([]);
  const [msg, setMsg] = useState<Message[]>([])
  const [user] = useContext(UserContext)

  const router = useRoute();
  const friend = router!.params!.friend as any;
  console.info(friend)


  useEffect(() => {
      async function getMessages(friendId: string) {
        const data = await chatService.getMessagesFromChat(friendId)
        setMsg(data)

        return data
      }

      getMessages(friend.id)
  }, [])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        name: 'NEYMAU',
        user: {
          _id: friend.id,
          name: friend.name,
          avatar: friend.avatar,
        },
      },
    ])
  }, [])

  const onSend = useCallback(async (messages = []) => {
    const firstMessage =  messages[0];
    await chatService.createMessage(friend.id, firstMessage.text)
    const ownMessages = {
      ...firstMessage,
      sentBy: user.id,
      sentTo: friend.id,
      createdAt: new Date()
    }
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, ownMessages))
  }, [])

  return (
    <View style={{flex:1,backgroundColor:"#f5f5f5"}}>
       <GiftedChat
            messages={messages}
            onSend={text => onSend(text)}
            user={{
                _id: user.id,
            }}
            renderBubble={(props)=>{
                return <Bubble
                {...props}
                wrapperStyle={{ 
                  right: {
                    backgroundColor: "#585EED",
                  }
                  
                }}
              />
            }}
            renderInputToolbar={(props) => {
                return <InputToolbar {...props}
                 containerStyle={{borderTopWidth: 1.5, borderTopColor: 'green'}} 
                 textInputStyle={{ color: "black" }}
                 />
            }}
            />
    </View>
  )}

export default LiveChat;
