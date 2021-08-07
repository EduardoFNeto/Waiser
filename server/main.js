var rug = require('random-username-generator');

Parse.Cloud.beforeSave("Post", async (request) => {
  const post = request.object;

  if (post.get("text") && post.get("text").trim() === "") {
    post.set("text", undefined);
  }
});

Parse.Cloud.beforeSave("Group", async (request) => {
    const group = request.object;
  
    if (group.get("description") && group.get("text").trim() === "") {
        group.set("description", undefined);
    }
  });

Parse.Cloud.beforeSave("User", async (request) => {
  const user = request.object;

  if (!user.get("avatar")) {
    user.set(
      "avatar",
      "https://images.unsplash.com/photo-1551503766-ac63dfa6401c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
    );
  }

  if (!request.original) {
    const new_username = rug.generate();

    user.set('username', new_username);
  }
});
