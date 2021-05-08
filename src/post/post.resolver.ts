import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsByTagsArgs } from "./dtos/get-posts";
import { Post } from "./post.model";
import { PostService } from "./post.service";
import { CreatePostArgs } from "./dtos/create-post.args";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { UserId } from "../helpers/user.decorator";

@Resolver()
export class PostResolver {

    constructor(private readonly postService: PostService) {
    }

    @Query(returns => [Post])
    async postsByTags(@Args() args: PostsByTagsArgs) {
        return this.postService.getPostsByTags(args.tags, args.from, args.amount);
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

    @UseGuards(AuthGuard)
    @Mutation(returns => Post, { nullable: true })
    async seePost(@Args({ name: "id", type: () => Int }) id: number, @UserId() userId: number) {
        return this.postService.seePost(id, userId);
    }
}
