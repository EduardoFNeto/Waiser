import { Tag } from "./tag";
import { User } from "./user";

export interface Post {
    id: string;
    title: string;
    text: string;
    user: User;
    tags?: Tag[];
}