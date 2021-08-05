import { Tag } from "../../models/tag";
import Parse from '../parse';

export const tagService = {
  async getAllTags() {
    const query = new Parse.Query("Tag");

    return await query.find().then((results) => {
      return results.map((result) => ({
        id: result.id,
        name: result.get('name')
      } as Tag));
    });
  },
};
