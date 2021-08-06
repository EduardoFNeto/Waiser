import { buildTagFromParse, Tag } from "./tag";
import { buildUserFromParse, User } from "./user";
import Parse from "../services/parse";

export interface Post {
  id: string;
  title: string;
  text: string;
  user: User;
  tags?: Tag[];
  isLiked: boolean;
  isDisliked: boolean;
  totalLikes: number;
  totalAnswers: number;
  createdAt: Date;
}

export const buildPostFromParse = (result: Parse.Object): Post => ({
  id: result.id,
  title: result.get("title")?.trim(),
  text: result.get("text")?.trim(),
  user: buildUserFromParse(result.get("user")),
  tags: (result.get('tags') || []).map((parseTag: Parse.Object) => buildTagFromParse(parseTag)),
  isLiked: getReaction(result.get("userLikes")),
  isDisliked: getReaction(result.get("userDislikes")),
  totalLikes: result.get("totalUserLikes") || 0,
  totalAnswers: result.get("totalAnswers") || 0,
  createdAt: result.createdAt,
});

const getReaction = (reactions?: Parse.User[]) => {
  if (!reactions) return false;

  return reactions?.some(user => user.id === Parse.User.current()!.id);
}
