import Parse from "../parse";

const pointService = {
  async addPointToUser(user: Parse.User, qtdPoints = 5) {
    try {
      user.increment("totalPoints", qtdPoints);
      await user.save();
    } catch (e) {}
  },
};

export default pointService;
