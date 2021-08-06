import { useRoute } from "@react-navigation/native";
import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { initializeParse, useParseQuery } from "@parse/react-native";
import { Avatar } from "../../../components/Avatar";
import { UserContext } from "../../../contexts/user";
import { buildMessageFromParse, Message } from "../../../models/message";
import { User } from "../../../models/user";
import { chatService } from "../../../services/api/chat";
import Parse from "../../../services/parse";

function LiveChat({ navigation }) {
  const [messages, setMessages] = useState<any>([]);
  const [msg, setMsg] = useState<Message[]>([]);
  const [user] = useContext(UserContext);

  const router = useRoute();
  const friend = router!.params!.friend as User;

  useEffect(() => {
    let subscription: any;

    async function getMessagesLiveQuery(friendId: string) {
      const query = await chatService.getMessagesQuery(friendId);
      subscription = await query.subscribe();

      subscription.on("create", (object: Parse.Object) => {
        if (object.get('owner').id === user.id) return;

        const message = buildMessageFromParse(object);

        const newMessage = {
          _id: message.id,
          text: message.text,
          createdAt: message.createdAt,
          name: "NEYMAU",
          user: {
            _id: message.owner.id,
            name: message.owner.name,
            avatar: message.owner.avatar,
          },
        };

        setMessages((previousMessages: any) =>
          GiftedChat.append(previousMessages, newMessage)
        );
      });
    }

    getMessagesLiveQuery(friend.id);

    return () => subscription?.removeAllListeners();
  }, []);

  useEffect(() => {
    async function getMessages(friendId: string) {
      const data = await chatService.getMessagesFromChat(friendId);
      setMsg(data);
    }

    getMessages(friend.id);
  }, []);

  useEffect(() => {
    const chatMessages = msg.reverse().map((message) => ({
      _id: message.id,
      text: message.text,
      createdAt: message.createdAt,
      name: "NEYMAU",
      user: {
        _id: message.owner.id,
        name: message.owner.name,
        avatar: message.owner.avatar,
      },
    }));

    setMessages(chatMessages);
  }, [msg]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: friend.name,
      headerRight: () => (
        <View style={{ marginRight: 12 }}>
          <Avatar user={friend} />
        </View>
      ),
    });
  }, [navigation, friend]);

  const onSend = useCallback(async (messages = []) => {
    const firstMessage = messages[0];
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, firstMessage)
    );

    await chatService.createMessage(friend.id, firstMessage.text);
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(text) => onSend(text)}
        user={{
          _id: user.id,
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "#585EED",
                },
              }}
            />
          );
        }}
        renderInputToolbar={(props) => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                borderTopWidth: 1.5,
                borderTopColor: "#dadada",
              }}
              textInputStyle={{ color: "black" }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default LiveChat;
