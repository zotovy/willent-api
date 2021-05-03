import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from "./post.model";
import { PostService } from "./post.service";
import { CreatePostArgs } from "./dtos/create-post.args";
import { GetPopularPosts } from "./dtos/popular-posts.args";

@Resolver()
export class PostResolver {

    constructor(private readonly postService: PostService) {
    }

    @Query(returns => [Post])
    async popularPosts(@Args() args: GetPopularPosts) {
        return this.postService.getPopular(args.from, args.amount);
    }


    @Mutation(returns => Post)
    async createPost(@Args() args: CreatePostArgs) {
        return await this.postService.create(args);
    }
}
