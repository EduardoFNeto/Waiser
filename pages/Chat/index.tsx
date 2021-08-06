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

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={profiles}
      renderItem={({ item }) => (
        <List.Item
          onPress={() => {
            navigation.navigate("LiveChat", { name: item.name, friend: item });
          }}
          title={item.name}
          left={(props) => (
            <Avatar.Image {...props} source={{ uri: item.avatar }} />
          )}
        />
      )}
    />
  )
}

export default Chat;

