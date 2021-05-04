import Post from "../post/post.type";

type User = {
    id: number;
    name: string;
    email: string;
    whoIs: string | null;
    password: string;
    profileImage: string | null;
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

export type RawUpdateData = Partial<RawSignupData>;
