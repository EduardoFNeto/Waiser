import { Post } from "../../models/post";

export const questionService = {
  async createQuestion(title: string, description: string) {
    const question = new Parse.Object("Question");
    question.set("text", title);
    question.set("anon", description);
    question.set("user", await Parse.User.currentAsync());

    return await question.save().then((result) => {
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

  async getFeed() {
    const query = new Parse.Query("Question");

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
      }));
    });
  },

  async getGroupFeed(groupId: string) {
    const parseGroup = new Parse.Object("Group");
    parseGroup.id = groupId;

    const query = new Parse.Query("Question");
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
      }));
    });
  },
};
