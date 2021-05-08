import User from "../../src/user/user.type";
import Post from "../../src/post/post.type";
import { AuthTokens } from "../../src/auth/types";

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

export const post: Post = {
    author: user,
    content: "this is my post",
    coverImage: "https://i.ytimg.com/vi/w8AYmSdaQZI/maxresdefault.jpg",
    createdAt: new Date(),
    id: 1,
    seenBy: [],
    tags: ["fun", "backend"],
    timeToRead: 5,
    title: "this is my post",
    subtitle: "this is my poooost"
}
