import { buildPostFromParse, Post } from "../../models/post";
import { Tag } from "../../models/tag";
import Parse from "../parse";

export const postService = {
  async createPost(title: string, text: string, tags?: Tag[]) {
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

    return await post.save().then(buildPostFromParse);
  },

  async getFeed(tagId?: string) {
    const query = new Parse.Query("Post");
    query.include("user");
    query.include("tags");
    query.exists("user");

    if (tagId) {
      const parseTag = new Parse.Object("Tag");
      parseTag.id = tagId;
      query.containsAll("tags", [parseTag]);
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
  },
};
