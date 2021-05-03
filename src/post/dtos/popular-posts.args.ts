import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class GetPopularPosts {
    @Field(type => Int, { nullable: true })
    from?: number;

    @Field(type => Int, { nullable: true })
    amount?: number;
}
