import { User } from "../user/user.model";

type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    author: User;
    seenBy: number[];
    coverImage: string;
    tags: string[];
    timeToRead: number;
}

export default Post;

export type CreatePostData = {
    title: string;
    content: string;
    authorId: number;
    coverImage: string;
    tags: string[];
    timeToRead: number;
}
