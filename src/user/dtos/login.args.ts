import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class LoginArgs {
    @Field()
    email: string;

    @Field()
    password: string;
}
