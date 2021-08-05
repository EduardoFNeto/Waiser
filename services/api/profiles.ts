import { User } from "../../models/user";

export const profileService = {
  async getProfileById(profileId: string) {
    const query = new Parse.Query(Parse.User);

    return await query.get(profileId).then((result) => {
      return {
        id: result.get("user").id,
        name: result.get("user").get("name"),
        username: result.get("user").get("username"),
        avatar: result.get("user").get("avatar"),
      } as User;
    });
  },

  async getProfileSuggestions() {
    const query = new Parse.Query(Parse.User);

    return await query.find().then((results) => {
      return results.map(
        (result) =>
          ({
            id: result.get("user").id,
            name: result.get("user").get("name"),
            username: result.get("user").get("username"),
            avatar: result.get("user").get("avatar"),
          } as User)
      );
    });
  },
};
