import User from "../user/user.type";

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
    subtitle: string;
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
