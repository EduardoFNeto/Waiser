import { Post } from "../../models/post";

export const postService = {
  async createPost(title: string, description: string) {
    const post = new Parse.Object("Post");
    post.set("text", title);
    post.set("anon", description);
    post.set("user", await Parse.User.currentAsync());

    return await post.save().then((result) => {
      return {
        id: result.id,
        title: result.get("title"),
        description: result.get("description"),
        user: {
          id: result.get("user").id,
          name: result.get("user").get("name"),
          username: result.get("user").get("username"),
        },
      } as Post;
    });
  },

  async getFeed(tagId?: string) {
    const query = new Parse.Query("Post");

    if (!tagId) {
      const userFollowQuery = new Parse.Query('UserFollow');
      userFollowQuery.equalTo('from', Parse.User.current());
      query.matchesKeyInQuery('user', 'to', userFollowQuery);
    }

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

  async getGroupFeed(groupId: string) {
    const parseGroup = new Parse.Object("Group");
    parseGroup.id = groupId;

    const query = new Parse.Query("Post");
    query.equalTo("group", parseGroup);

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
