import { buildTagFromParse, Tag } from "./tag";
import { User } from "./user";
import Parse from '../services/parse'

export interface Group {
  id: string;
  title: string;
  description: string;
  user?: User;
  tags?: Tag[];
  isJoined: boolean;
}

export const buildGroupFromParse = (result: Parse.Object): Group => ({
  id: result.id,
  title: result.get("title"),
  description: result.get("description"),
  tags: (result.get("tags") || []).map(buildTagFromParse),
  isJoined: checkIfJoin(result.get("users"))
});

const checkIfJoin = (joineds?: Parse.User[]) => {
  if (!joineds) return false;

  return joineds?.some(user => user.id === Parse.User.current()!.id);
}
