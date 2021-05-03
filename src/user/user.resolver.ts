import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User, UserWithAuthTokens } from "./user.model";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";

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
    async signup(
        @Args({ name: "name", type: () => String }) name,
        @Args({ name: "email", type: () => String }) email,
        @Args({ name: "password", type: () => String }) password,
    ) {
        return this.userService.signup({ email, password, name });
    }

    @Mutation(returns => UserWithAuthTokens, { nullable: true })
    async login(
        @Args({ name: "email", type: () => String }) email,
        @Args({ name: "password", type: () => String }) password,
    ) {
        return this.userService.login(email, password);
    }
}

