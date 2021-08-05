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

  async getFeed(title: string, description: string) {
    const query = new Parse.Query("Question");

    return await query.find().then((result) => {
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
};
