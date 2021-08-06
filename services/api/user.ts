import { buildUserFromParse } from "../../models/user";
import Parse from "../parse";

export const userService = {
  async createProfile(username: string, bio: string) {
    const parseUser = await Parse.User.currentAsync();

    if (!parseUser) {
      return;
    }

    parseUser.set("username", username);
    parseUser.set("bio", bio);

    return await parseUser
      .save()
      .then((result: Parse.User) => buildUserFromParse(result));
  },
};
