import { User } from "../../models/user";
import Parse from "../parse";

export const likeService = {
  async like(postId: string) {
    const parsePost = new Parse.Object("Post");
    parsePost.id = postId;

    const parseUser = await Parse.User.currentAsync();

    const isLiked = parseUser
      ?.get("userLikes")
      ?.some((user: User) => user.id === parseUser.id);

    if (isLiked) {
      parseUser?.remove("userLikes", parseUser);
      await parseUser?.save();
      return true;
    }

    parseUser?.add("userLikes", parseUser);
    await parseUser?.save();
    return true;
  },

  async dislike(postId: string) {
    const parsePost = new Parse.Object("Post");
    parsePost.id = postId;

    const parseUser = await Parse.User.currentAsync();

    const isDisliked = parseUser
      ?.get("userDislikes")
      ?.some((user: User) => user.id === parseUser.id);

    if (isDisliked) {
      parseUser?.remove("userDislikes", parseUser);
      await parseUser?.save();
      return true;
    }

    parseUser?.add("userDislikes", parseUser);
    await parseUser?.save();
    return true;
  },
};
