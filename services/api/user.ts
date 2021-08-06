import { buildUserFromParse } from "../../models/user";
import Parse from "../parse";

export const userService = {
  async createProfile(username: string, password: string, email: string) {
    const parseUser = new Parse.User();

    if (!parseUser) {
      return;
    }

    parseUser.set("username", username);
    parseUser.set("password", password);
    parseUser.set("email", email);

    return await parseUser
      .signUp()
      .then((result: Parse.User) => buildUserFromParse(result));
  },

  async finishProfile(name: string, bio: string) {
    const parseUser = await Parse.User.currentAsync();

    if (!parseUser) {
      return;
    }

    parseUser.set("name", name);
    parseUser.set("bio", bio);

    return await parseUser
      .save()
      .then((result: Parse.User) => buildUserFromParse(result));
  },

  async loginProfile(username: string, password: string) {
    await Parse.User.logIn(username, password);
  },
};
