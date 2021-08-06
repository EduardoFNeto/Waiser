import { User, buildUserFromParse } from "./user"

export interface Message {
  owner: User;
  text: string;
}

export interface Chat {
  friend: User,
}

export const buildMessageFromParse = (message: Parse.Object): Message => ({
  owner: buildUserFromParse(message.get("owner")),
  text: message.get("text"),
})

export const buildChatFromParse = (chat: Parse.Object): Chat => ({
  friend: buildUserFromParse(chat.get("friend")),
})