import Post from "../post/post.type";

type User = {
    id: number;
    name: string;
    email: string;
    whoIs?: string;
    password: string;
    profileImage?: string;
    posts: Post[];
    seen: number[];
    createdAt: Date;
}

export default User;


export type RawSignupData = {
    name: string;
    email: string;
    password: string;
}
