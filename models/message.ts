import { User, buildUserFromParse } from "./user";

export interface Message {
  id: string;
  owner: User;
  text: string;
  createdAt: Date;
}

export interface Chat {
  id: string;
  friend: User;
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

export const buildMessageFromParse = (message: Parse.Object): Message => ({
  id: message.id,
  owner: buildUserFromParse(message.get("owner")),
  text: message.get("text"),
  createdAt: message.createdAt,
});

export const buildChatFromParse = (chat: Parse.Object): Chat => ({
  id: chat.id,
  friend: buildUserFromParse(chat.get("friend")),
  lastMessage: chat.get("lastMessage")
    ? buildMessageFromParse(chat.get("lastMessage"))
    : undefined,
  createdAt: chat.createdAt,
  updatedAt: chat.updatedAt
});
