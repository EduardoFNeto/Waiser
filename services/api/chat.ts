import Parse from "../parse";
import {
  buildChatFromParse,
  buildMessageFromParse,
  Message,
} from "../../models/message";

export const chatService = {
  async createMessage(friendId: string, messageText: string) {
    const chatQuery = new Parse.Query("Chat");
    const user = Parse.User.current();

    const friend = new Parse.User();
    friend.id = friendId;

    if (!user) return;

    await createMessageOwner(user, friend, messageText);
    await createMessageFriend(user, friend, messageText);
  },

  async getMessagesFromChat(friendId: string) {
    const user = Parse.User.current();
    const friend = new Parse.User();
    friend.id = friendId;

    const getChat = new Parse.Query("Chat");

    getChat.equalTo("user", user);
    getChat.equalTo("friend", friend);
    getChat.include("owner");

    let chat = await getChat.first();
    if (!chat) return [];

    const messages = new Parse.Query("Message");
    messages.equalTo("chat", chat);

    return messages.find().then((results) => {
      return results.map(buildMessageFromParse);
    });
  },

  async getAllChats() {
    const user = Parse.User.current();

    const getChat = new Parse.Query("Chat");

    getChat.equalTo("user", user);
    getChat.include("friend");

    return await getChat.find().then((results) => {
      return results.map(buildChatFromParse);
    });
  },
};

async function createMessageOwner(
  user: Parse.User,
  friend: Parse.User,
  messageText: string
) {
  const chatQuery = new Parse.Query("Chat");

  chatQuery.equalTo("user", user);
  chatQuery.equalTo("friend", friend);

  let chat = await chatQuery.first();

  if (!chat) {
    const _chat = new Parse.Object("Chat");
    _chat.set("user", user);
    _chat.set("friend", friend);
    chat = await _chat.save();
  }

  const message = new Parse.Object("Message");
  message.set("owner", user);
  message.set("text", messageText);
  message.set("chat", chat);

  await message.save();
}

async function createMessageFriend(
  user: Parse.User,
  friend: Parse.User,
  messageText: string
) {
  const chatQuery = new Parse.Query("Chat");

  chatQuery.equalTo("user", friend);
  chatQuery.equalTo("friend", user);

  let chat = await chatQuery.first();

  if (!chat) {
    const _chat = new Parse.Object("Chat");
    _chat.set("user", friend);
    _chat.set("friend", user);
    chat = await _chat.save();
  }

  const message = new Parse.Object("Message");
  message.set("owner", user);
  message.set("text", messageText);
  message.set("chat", chat);

  await message.save();
}
