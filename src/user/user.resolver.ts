import { Resolver, Query } from "@nestjs/graphql";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService) {
    }

    @Query(returns => [User])
    async users() {
        return this.userService.findAll();
    }
}
