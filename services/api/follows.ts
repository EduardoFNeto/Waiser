import { User } from "../../models/user";

export const followService = {
  async follow(profileId: string) {
    const parseProfile = new Parse.User();
    parseProfile.id = profileId

    const userFollowQuery = new Parse.Query('UserFollow');
    userFollowQuery.equalTo('from', Parse.User.current());
    userFollowQuery.equalTo('to', parseProfile);

    const isFollowing = await userFollowQuery.first();

    if (isFollowing) {
        await isFollowing.destroy()
        return true;
    }

    const userFollow = new Parse.Object('UserFollow');
    userFollow.set('from', parseProfile);
    userFollow.set('to', Parse.User.current());

    await userFollow.save();
    return true;
  },
};
