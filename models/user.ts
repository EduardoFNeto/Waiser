import { buildTagFromParse, Tag } from "./tag";

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  email: string;
  bio: string;
  tags: Tag[];
  totalReceivedLikes: number;
  totalAnswers: number;
  totalPoints: number;
}

export const buildUserFromParse = (result: Parse.Object): User => ({
  id: result.id,
  name: result.get("name"),
  username: result.get("username"),
  email: result.get("email"),
  bio: result.get("bio"),
  avatar: result.get("avatar"),
  tags: result.get("tags")
    ? result.get("tags").map(buildTagFromParse)
    : ([] as Tag[]),
  totalReceivedLikes: result.get("totalReceivedLikes") || 0,
  totalAnswers: result.get("totalAnswers") || 0,
  totalPoints: result.get("totalPoints") || 0,
});
