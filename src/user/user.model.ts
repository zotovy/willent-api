import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from "../post/post.model";
import { AuthTokens } from "../auth/token.model";

@ObjectType()
export class User {
    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    whoIs?: string;

    @Field({ nullable: true })
    profileImage?: string;

    @Field(type => [Post])
    posts: Post[];

    @Field(type => [Post])
    seen: Post[];

    @Field()
    createdAt: Date;
}

@ObjectType()
export class UserWithAuthTokens {
    @Field(returns => User)
    user: User;

    @Field(returns => AuthTokens)
    tokens: AuthTokens;
}
