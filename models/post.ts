import { buildTagFromParse, Tag } from "./tag";
import { buildUserFromParse, User } from "./user";
import Parse from "../services/parse";

export interface Post {
  id: string;
  title: string;
  text: string;
  user: User;
  tags?: Tag[];
}

export const buildPostFromParse = (result: Parse.Object): Post => ({
  id: result.id,
  title: result.get("title"),
  text: result.get("text"),
  user: buildUserFromParse(result.get("user")),
  tags: (result.get('tags') || []).map((parseTag: Parse.Object) => buildTagFromParse(parseTag))
});
