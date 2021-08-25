var rug = require("random-username-generator");

Parse.Cloud.beforeSave("Post", (request) => {
  const post = request.object;
  console.log("Post beforeSave after run");

  if (post.get("text") === "") {
    console.log("update text");

    post.set("text", null);
  }

  console.log("Post beforeSave run!");
});

Parse.Cloud.beforeSave("Group", (request) => {
  const group = request.object;
  console.log("Group beforeSave after run");

  if (group.get("description") === "") {
    console.log("update description");

    group.set("description", null);
  }
  console.log("Group beforeSave run!");
});

Parse.Cloud.beforeSave(Parse.User, (request) => {
  const user = request.object;

  if (!user.get("avatar")) {
    user.set(
      "avatar",
      "https://images.unsplash.com/photo-1551503766-ac63dfa6401c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
    );
  }

  if (!request.original && user.get("authData")) {
    const new_username = rug.generate();

    user.set("username", new_username);
  }
});
