import { User } from "../../models/user";
import Parse from '../parse';

export const profileService = {
  async getProfileById(profileId: string) {
    const query = new Parse.Query(Parse.User);

    return await query.get(profileId).then((result) => {
      return {
        id: result.id,
        name: result.get("name"),
        username: result.get("username"),
        email: result.get("email"),
        bio: result.get("bio"),
        avatar: result.get("avatar"),
        tags: result.get("tags"),
      } as User;
    });
  },

  async getProfileSuggestions() {
    const query = new Parse.Query(Parse.User);

    return await query.find().then((results) => {
      return results.map(
        (result) =>
          ({
            id: result.id,
            name: result.get("name"),
            username: result.get("username"),
            email: result.get("email"),
            bio: result.get("bio"),
            avatar: result.get("avatar"),
            tags: result.get("tags"),
          } as User)
      );
    });
  },
};
