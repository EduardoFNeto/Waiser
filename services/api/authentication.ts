import { buildUserFromParse } from "../../models/user";
import Parse from "../parse";

export async function facebookLogin({
  id,
  name,
  access_token,
  expiration_date,
  picture,
}: any) {
  const authData = {
    id,
    access_token,
    expiration_date,
    name,
  };

  const parseUser = (await Parse.FacebookUtils.logIn(
    authData
  )) as unknown as Parse.User;

  if (!parseUser.get('name')) parseUser.set("name", name);
  if (!parseUser.get('avatar')) parseUser.set("avatar", picture);

  return await parseUser.save().then((result: Parse.User) => {
    return buildUserFromParse(result);
  });
}

export async function logOut() {
  return await Parse.User.logOut();
}
