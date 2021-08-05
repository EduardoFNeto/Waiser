import { User } from "./user";

export interface Group {
    id: string;
    title: string;
    description: string;
    user: User;
}