import { Tag } from "./tag";

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  email: string;
  bio: string;
  tags: Tag[];
}

export const buildUserFromParse = (result: Parse.Object): User => ({
  id: result.id,
  name: result.get("name"),
  username: result.get("username"),
  email: result.get("email"),
  bio: result.get("bio"),
  avatar: result.get("avatar"),
  tags: result.get("tags"),
});
