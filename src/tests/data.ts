import User from "../user/user.type";
import { AuthTokens } from "../auth/types";

export const user: User = {
    id: 1,
    name: "Yaroslav",
    createdAt: new Date(),
    email: "m@zotov.dev",
    password: "12345678Aa",
    posts: [],
    profileImage: null,
    seen: [],
    whoIs: null,
}

export const tokens: AuthTokens = {
    refresh: "123.123.123",
    access: "456.456.456",
}
