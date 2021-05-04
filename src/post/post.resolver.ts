import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from "./post.model";
import { PostService } from "./post.service";
import { CreatePostArgs } from "./dtos/create-post.args";
import { GetPopularPosts } from "./dtos/popular-posts.args";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { UserId } from "../helpers/user.decorator";

@Resolver()
export class PostResolver {

    constructor(private readonly postService: PostService) {
    }

    @Query(returns => [Post])
    async popularPosts(@Args() args: GetPopularPosts) {
        return this.postService.getPopular(args.from, args.amount);
    }

    @Query(returns => Post, { nullable: true })
    async post(@Args({ name: "id", type: () => Int }) id: number) {
        return this.postService.getById(id);
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Post)
    async createPost(@Args() args: CreatePostArgs,  @UserId() userId: number) {
        args.authorId = userId;
        return await this.postService.create(args);
    }
}
