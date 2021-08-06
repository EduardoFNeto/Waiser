import Parse from "../services/parse";

export interface Tag {
  id: string;
  name: string;
}

export const buildTagFromParse = (result: Parse.Object): Tag => ({
  id: result.id,
  name: result.get("name"),
});
