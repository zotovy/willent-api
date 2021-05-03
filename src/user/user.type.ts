import Post from "../post/post.type";

type User = {
    id: number;
    name: string;
    email: string;
    whoIs?: string;
    profileImage?: string;
    posts: Post[];
    seen: Post[];
    createdAt: Date;
}

export default User;
