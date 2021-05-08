import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class PostsByTagsArgs {
    @Field(type => [String])
    tags: string[];

    @Field(type => Int, { nullable: true })
    from?: number;

    @Field(type => Int, { nullable: true })
    amount?: number;
}
