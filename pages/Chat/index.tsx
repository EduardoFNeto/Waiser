import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { List } from "react-native-paper";
import { Avatar } from "../../components/Avatar";
import { UserContext } from "../../contexts/user";
import { Chat as ChatModel } from "../../models/message";
import { User } from "../../models/user";
import { chatService } from "../../services/api/chat";
import { profileService } from "../../services/api/profiles";
import dateUtils from "../../utils/dates";

function Chat({ navigation }) {
  const [chats, setChats] = useState<ChatModel[]>([]);
  const [user] = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      chatService.getAllChats().then((results) => {
        setChats(results);
      });
    }, [])
  );

  const getDescription = (item: ChatModel) => {
    let description = "";

    if (item.lastMessage) {
      description =
        item.lastMessage?.owner.id === user.id
          ? "você: " + item.lastMessage?.text
          : item.friend.name + ": " + item.lastMessage?.text;

      description += " · ";
    }

    description += dateUtils.timeAgo(item.updatedAt);

    return description;
  };

  return (
    <FlatList
      style={styles.container}
      keyExtractor={(item) => item.id}
      data={chats}
      renderItem={({ item }) => (
        <List.Item
          onPress={() => {
            navigation.navigate("LiveChat", { friend: item.friend });
          }}
          title={item.friend.name}
          description={getDescription(item)}
          descriptionNumberOfLines={1}
          left={(props) => <Avatar {...props} user={item.friend} size={50} />}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default Chat;
