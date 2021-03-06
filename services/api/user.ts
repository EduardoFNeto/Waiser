import { parse } from "expo-linking";
import { Tag } from "../../models/tag";
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

  async finishProfile(username: string, name: string, bio: string) {
    const parseUser = await Parse.User.currentAsync();

    if (!parseUser) {
      return;
    }

    parseUser.set("username", username);
    parseUser.set("name", name);
    parseUser.set("bio", bio);

    return await parseUser
      .save()
      .then((result: Parse.User) => buildUserFromParse(result));
  },

  async loginProfile(username: string, password: string) {
    return await Parse.User.logIn(username, password).then((user) => {
      return buildUserFromParse(user)
    });
  },
  
  async addUserTags(tags: Tag[]) {
    const user = await Parse.User.currentAsync();

    if(!user) return;
    const parseTags = tags.map((tag) => {
      const parseTag = new Parse.Object("Tag");
      parseTag.id = tag.id;
      return parseTag;
    })

    user?.set("tags", parseTags)  
    return await user.save().then((result: Parse.User) => buildUserFromParse(result));
  },
};
