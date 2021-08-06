import { buildTagFromParse, Tag } from "../../models/tag";
import Parse from '../parse';

export const tagService = {
  async getAllTags() {
    const query = new Parse.Query("Tag");

    return await query.find().then((results) => {
      return results.map(buildTagFromParse);
    });
  },

  async getMyTags() {
    const user = await Parse.User.currentAsync();

    return user?.get('tags')?.map(buildTagFromParse);
  },
};
