import { buildGroupFromParse } from "../../models/group";
import { Tag } from "../../models/tag";
import Parse from "../parse";

export const groupService = {
  async createGroup(title: string, description: string, tags: Tag[]) {
    const group = new Parse.Object("Group");
    group.set("title", title);
    group.set("description", description);
    group.set("user", Parse.User.current());
    group.set("users", [Parse.User.current()]);

    if (tags?.length) {
      const parseTags = tags.map((tag) => {
        const parseTag = new Parse.Object("Tag");
        parseTag.id = tag.id;
        return parseTag;
      });
      group.set("tags", parseTags);
    }

    return await group.save().then(async (result) => {
      return buildGroupFromParse(result);
    });
  },

  async joinGroup(groupId: string) {
    const query = new Parse.Query("Group");
    const group = await query.get(groupId);

    if (!group) {
      return;
    }

    if (
      group
        .get("users")
        ?.some((user: Parse.User) => user.id === Parse.User.current()!.id)
    ) {
      group.remove("users", Parse.User.current());
      await group.save();
      return;
    }

    group.add("users", Parse.User.current());
    await group.save();
  },

  async getGroupById(groupId: string) {
    const query = new Parse.Query("Group");
    return await query.get(groupId).then(buildGroupFromParse);
  },

  async getMyGroups() {
    const query = new Parse.Query("Group");
    query.containedIn("users", [Parse.User.current()]);

    return await query.find().then((results) => {
      return results.map(buildGroupFromParse);
    });
  },

  async getAllGroups() {
    const query = new Parse.Query("Group");
    query.notContainedIn("users", [Parse.User.current()]);

    return await query.find().then((results) => {
      return results.map(buildGroupFromParse);
    });
  },
};

const userJoinedInTheGroup = () => {};
