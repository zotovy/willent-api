import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class PostsByTagsArgs {
    @Field(type => [String])
    tags: string[];
}
