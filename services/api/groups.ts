import { Group } from "../../models/group";
import { Post } from "../../models/post";

export const groupService = {
  async createGroup(title: string, description: string) {
    const group = new Parse.Object("Group");
    group.set("text", title);
    group.set("description", description);
    group.set("user", await Parse.User.currentAsync());

    return await group.save().then((result) => {
      return {
        id: result.id,
        title: result.get("title"),
        description: result.get("description"),
        user: {
          id: result.get("user").id,
          name: result.get("user").get("name"),
          username: result.get("user").get("username"),
        },
      } as Group;
    });
  },

  async getGroupById(groupId: string) {
    const query = new Parse.Query("Group");

    return await query.get(groupId).then((result) => {
      return ({
        id: result.id,
        title: result.get("title"),
        description: result.get("description"),
        user: {
          id: result.get("user").id,
          name: result.get("user").get("name"),
          username: result.get("user").get("username"),
        },
      } as Post)
    });
  },

  async getMyGroups() {
    const query = new Parse.Query("Group");

    const userGroupQuery = new Parse.Query('UserGroup');
    userGroupQuery.equalTo('user', Parse.User.current());
    query.matchesKeyInQuery('id', 'group', userGroupQuery);

    return await query.find().then((results) => {
      return results.map((result) => ({
        id: result.id,
        title: result.get("title"),
        description: result.get("description"),
        user: {
          id: result.get("user").id,
          name: result.get("user").get("name"),
          username: result.get("user").get("username"),
        },
      } as Post));
    });
  },

  async getAllGroups() {
    const query = new Parse.Query("Group");

    const userGroupQuery = new Parse.Query('UserGroup');
    userGroupQuery.equalTo('user', Parse.User.current());
    query.doesNotMatchKeyInQuery('id', 'group', userGroupQuery);

    return await query.find().then((results) => {
      return results.map((result) => ({
        id: result.id,
        title: result.get("title"),
        description: result.get("description"),
        user: {
          id: result.get("user").id,
          name: result.get("user").get("name"),
          username: result.get("user").get("username"),
        },
      } as Post));
    });
  },
};
