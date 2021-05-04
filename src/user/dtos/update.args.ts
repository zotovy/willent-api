import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UpdateArgs {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    password?: string;
}
