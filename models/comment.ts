import { Post } from "./post";
import { User } from "./user";

export interface Comment {
    id: string;
    text: string;
    user: User;
}