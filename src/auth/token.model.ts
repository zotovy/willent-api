import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthTokens {
    @Field()
    access: string;

    @Field()
    refresh: string;
}
