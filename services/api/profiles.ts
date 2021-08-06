import { buildUserFromParse } from "../../models/user";
import Parse from '../parse';

export const profileService = {
  async getProfileById(profileId: string) {
    const query = new Parse.Query(Parse.User);
    query.include('tags')

    return await query.get(profileId).then(buildUserFromParse);
  },

  async getProfileSuggestions() {
    const query = new Parse.Query(Parse.User);

    return await query.find().then((results) => {
      return results.map(buildUserFromParse);
    });
  },
};
