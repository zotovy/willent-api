import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreatePostArgs {
    @Field(type => String)
    title: string;

    @Field(type => String)
    content: string;

    @Field(type => Int)
    authorId: number;

    @Field(type => String)
    coverImage: string;

    @Field(type => [String])
    tags: string[];

    @Field(type => Int)
    timeToRead: number;
}
