import { User } from "../../models/user";
import Parse from "../parse";
import pointService from "./points";

export const likeService = {
  async like(postId: string) {
    const query = new Parse.Query("Post");
    query.include("user");
    const parsePost = await query.get(postId);
    if (!parsePost) return;

    const parseUser = await Parse.User.currentAsync();
    if (!parseUser) return;

    if (await removeReactionIfExists(parsePost, parseUser, "userLikes")) {
      if (parsePost.get("user")) {
        parsePost.get("user").increment("totalReceivedLikes", -1);
        await parsePost.get("user").save();
      }
      return true;
    }

    await removeReactionIfExists(parsePost, parseUser, "userDislikes");

    parsePost.add("userLikes", parseUser);
    parsePost.increment("totalUserLikes", 1);
    await parsePost?.save();

    if (parsePost.get("user")) {
      parsePost.get("user").increment("totalReceivedLikes", 1);
      await parsePost.get("user").save();

      await pointService.addPointToUser(parsePost.get("user"), 5);
    }

    return true;
  },

  async dislike(postId: string) {
    const query = new Parse.Query("Post");
    const parsePost = await query.get(postId);
    if (!parsePost) return;

    const parseUser = await Parse.User.currentAsync();
    if (!parseUser) return;

    if (await removeReactionIfExists(parsePost, parseUser, "userDislikes")) {
      return true;
    }

    await removeReactionIfExists(parsePost, parseUser, "userLikes");

    parsePost.add("userDislikes", parseUser);
    parsePost.increment("totalUserDislikes", 1);
    await parsePost.save();
    return true;
  },
};

const removeReactionIfExists = async (
  parsePost: Parse.Object,
  parseUser: Parse.User,
  reaction: "userLikes" | "userDislikes"
) => {
  const isLiked = parsePost
    ?.get(reaction)
    ?.some((user: User) => user.id === parseUser.id);

  if (isLiked) {
    parsePost?.remove(reaction, parseUser);
    parsePost.increment(
      reaction === "userLikes" ? "totalUserLikes" : "totalUserDislikes",
      -1
    );
    await parsePost?.save();
    return true;
  }
};
