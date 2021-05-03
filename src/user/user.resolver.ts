import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User, UserWithAuthTokens } from "./user.model";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { LoginArgs } from "./dtos/login.args";
import { SignupArgs } from "../post/dtos/signup.args";
import { AuthTokens } from "../auth/token.model";

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService) {
    }

    @UseGuards(AuthGuard)
    @Query(returns => [User])
    async users() {
        return this.userService.findAll();
    }

    @Mutation(returns => UserWithAuthTokens)
    async signup({ email, password, name }: SignupArgs) {
        return this.userService.signup({ email, password, name });
    }

    @Mutation(returns => UserWithAuthTokens, { nullable: true })
    async login(@Args() { email, password }: LoginArgs) {
        return this.userService.login(email, password);
    }

    @Mutation(returns => AuthTokens, { nullable: true })
    async updateTokens(@Args({ name: "token", type: () => String }) token) {
        return this.userService.updateToken(token);
    }
}

