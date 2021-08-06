import { buildPostFromParse, Post } from "../../models/post";
import { Tag } from "../../models/tag";
import Parse from "../parse";
import pointService from "./points";

export const postService = {
  async createPost(
    title: string,
    text: string,
    tags?: Tag[],
    groupId?: string,
    profileId?: string
  ) {
    const post = new Parse.Object("Post");
    post.set("title", title);
    post.set("text", text);
    post.set("user", await Parse.User.currentAsync());

    if (tags?.length) {
      const parseTags = tags.map((tag) => {
        const parseTag = new Parse.Object("Tag");
        parseTag.id = tag.id;
        return parseTag;
      });
      post.set("tags", parseTags);
    }

    if (groupId) {
      const group = new Parse.Object("Group");
      group.id = groupId;
      post.set("group", group);
    }

    if (profileId) {
      const profile = new Parse.Object("User");
      profile.id = profileId;
      post.set("profile", profile);
    }

    return await post.save().then(buildPostFromParse);
  },

  async getFeed(tagId?: string, currentPage?: number) {
    const query = new Parse.Query("Post");
    query.include("user");
    query.include("tags");
    query.exists("user");
    query.doesNotExist("group");
    query.doesNotExist("parent");
    query.descending("createdAt");
    query.limit(10);
    query.skip((currentPage || 0) * 10);

    if (tagId !== "explore") {
      const user = Parse.User.current();
      if (!user) return [];

      if (user.get("tags") && user.get("tags").length) {
        query.containedIn("tags", user.get("tags"));
      }

      if (tagId) {
        const parseTag = new Parse.Object("Tag");
        parseTag.id = tagId;
        query.containedIn("tags", [parseTag]);
      }
    }

    return await query.find().then((results) => {
      return results.map(buildPostFromParse);
    });
  },

  async getGroupFeed(groupId: string) {
    const parseGroup = new Parse.Object("Group");
    parseGroup.id = groupId;

    const query = new Parse.Query("Post");
    query.equalTo("group", parseGroup);
    query.include("user");
    query.exists("user");
    query.doesNotExist("parent");
    query.descending("createdAt");

    return await query.find().then((results) => {
      return results.map(buildPostFromParse);
    });
  },

  async getAnswersByPostId(postId: string) {
    const parsePost = new Parse.Object("Post");
    parsePost.id = postId;

    const query = new Parse.Query("Post");
    query.equalTo("parent", parsePost);
    query.include("user");
    query.exists("user");
    query.descending("createdAt");

    return await query.find().then((results) => {
      return results.map(buildPostFromParse);
    });
  },

  async getPostById(postId: string) {
    const query = new Parse.Query("Post");
    query.include("user");

    return await query.get(postId).then(buildPostFromParse);
  },

  async createPostAnswer(parentPostId: string, text: string) {
    const parentPost = new Parse.Object("Post");
    parentPost.id = parentPostId;

    const post = new Parse.Object("Post");
    post.set("title", text);
    post.set("user", await Parse.User.currentAsync());
    post.set("parent", parentPost);

    await post.save();

    parentPost.increment("totalAnswers", 1);
    await parentPost.save();

    const user = Parse.User.current();
    if (!user) return;

    user.increment("totalAnswers", 1);
    await pointService.addPointToUser(user, 7);
  },
};
