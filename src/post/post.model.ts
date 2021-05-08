import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../user/user.model";

@ObjectType()
export class Post {
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field()
    subtitle: string;

    @Field()
    createdAt: Date;

    @Field(type => User)
    author: User;

    @Field(type => [Int])
    seenBy: number[];

    @Field()
    coverImage: string;

    @Field(type => [String])
    tags: string[];

    @Field(type => Int)
    timeToRead: number;
}
