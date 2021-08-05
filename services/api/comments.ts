import { Comment } from "../../models/comment";

export const commentService = {
  async createComment(postId: string, text: string, parentCommentId?: string, ) {
    const post = new Parse.Object("Post");
    post.id = postId;

    const comment = new Parse.Object("Comment");
    comment.set("text", text);
    comment.set("post", post);
    comment.set("user", await Parse.User.currentAsync());

    if (parentCommentId) {
        const parentComment = new Parse.Object("Comment");
        parentComment.id = parentCommentId;
        comment.set("parent", parentComment);
    }

    return await comment.save().then((result) => {
      return {
        id: result.id,
        text: result.get("text"),
        user: {
          id: result.get("user").id,
          name: result.get("user").get("name"),
          username: result.get("user").get("username"),
        },
      } as Comment;
    });
  },

  async getCommentsByPostId(postId: string) {
    const post = new Parse.Object("Post");
    post.id = postId;

    const query = new Parse.Query("Comment");
    query.equalTo('post', post);

    return await query.find().then((results) => {
      return results.map((result) => ({
        id: result.id,
        text: result.get("text"),
        user: {
          id: result.get("user").id,
          name: result.get("user").get("name"),
          username: result.get("user").get("username"),
        },
      } as Comment));
    });
  },

  async getCommentReplies(commentId: string) {
    const comment = new Parse.Object("Comment");
    comment.id = commentId;

    const query = new Parse.Query("Comment");
    query.equalTo('parent', comment);

    return await query.find().then((results) => {
      return results.map((result) => ({
        id: result.id,
        text: result.get("text"),
        user: {
          id: result.get("user").id,
          name: result.get("user").get("name"),
          username: result.get("user").get("username"),
        },
      } as Comment));
    });
  },

};
