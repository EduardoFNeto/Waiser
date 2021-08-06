import React, { useState, useCallback, useEffect, useContext } from 'react'
import { FlatList } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { Avatar, List } from 'react-native-paper';
import { UserContext } from '../../contexts/user';
import { User } from '../../models/user';
import { profileService } from '../../services/api/profiles';



function Chat({ navigation }) {
  const [messages, setMessages] = useState<any>([]);
  const [user] = useContext(UserContext)

  const [profiles, setProfiles] = React.useState<User[]>([]);

  useEffect(() => {
    profileService.getProfileSuggestions().then((results) => {
      setProfiles(results);
    });
  }, []);

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

  const giftedChat = () => {
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
  }

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={profiles}
      renderItem={({ item }) => (
        <List.Item
          onPress={() => {
            navigation.navigate("LiveChat", { name: item.name });
          }}
          title={item.name}
          description={item.username}
          left={(props) => (
            <Avatar.Image {...props} source={{ uri: item.avatar }} />
          )}
        />
      )}
    />
  )
}

export default Chat;

