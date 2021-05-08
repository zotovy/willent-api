import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User, UserWithAuthTokens } from "./user.model";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { LoginArgs } from "./dtos/login.args";
import { SignupArgs } from "./dtos/signup.args";
import { AuthTokens } from "../auth/token.model";
import { UpdateArgs } from "./dtos/update.args";
import { UserId } from "../helpers/user.decorator";

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService) {
    }

    @UseGuards(AuthGuard)
    @Query(returns => [User])
    async users() {
        return this.userService.findAll();
    }

    @UseGuards(AuthGuard)
    @Query(returns => User, { nullable: true })
    async me(@UserId() id: number) {
        return this.userService.getById(id);
    }

    @Mutation(returns => UserWithAuthTokens)
    async signup(@Args() { email, password, name }: SignupArgs) {
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

    @UseGuards(AuthGuard)
    @Mutation(returns => User, { nullable: true })
    async updateUser(@UserId() id, @Args() args: UpdateArgs) {
        return this.userService.updateUser(id, args);
    }
}

