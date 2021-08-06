import { User } from '../../models/user';
import Parse from '../parse';

export async function facebookLogin({ id, name, access_token, expiration_date, picture }: any) {
  const authData = {
    id,
    access_token,
    expiration_date,
    name,
  };

  const parseUser = ((await Parse.FacebookUtils.logIn(authData)) as unknown) as Parse.User;

  parseUser.set("name", name);
  parseUser.set("avatar",  picture);

  return await parseUser.save().then((result: Parse.User) => {
    return {
      id: result.id,
      name: result.get("name"),
      username: result.getUsername(),
      avatar: result.get("avatar")
    } as User
  })
}


export async function logOut() {
 return await Parse.User.logOut()
}