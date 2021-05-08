import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Post, { CreatePostData } from "./post.type";
import { PrismaService } from "../prisma/prisma.service";
import { PostValidator } from "./post.validator";
import { user } from "../../test/unit/data";

@Injectable()
export class PostService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly validator: PostValidator,
    ) {
    }

    private readonly postSeo = {
        seePostFirstTime: 20,
        seePostSecondTime: 5,
    }

    async create(data: CreatePostData) {
        this.validator.validatePostCreationData(data);
        return await this.prisma.post.create({
            data,
            include: {
                author: true,
            }
        });
    }

    async getById(id: number) {
        return this.prisma.post.findFirst({
            where: { id },
            include: {
                author: true,
            },
        });
    }

    async seePost(id: number, userId: number) {
        let post = await this.prisma.post.findFirst({ where: { id } });
        if (!post) throw new HttpException("invalid post id", HttpStatus.BAD_REQUEST);

        if (!post.seenBy.includes(userId)) {
            // If user see post first time
            post = await this.prisma.post.update({
                where: { id },
                data: {
                    rating: post.rating + this.postSeo.seePostFirstTime,
                    seenBy: {
                        push: userId,
                    }
                },
            });

            this.prisma.user.update({
                where: { id: userId },
                data: {
                    seen: {
                        push: id,
                    }
                }
            })
        } else {
            // if user already see this post some time
            post = await this.prisma.post.update({
                where: { id },
                data: {
                    rating: post.rating + this.postSeo.seePostSecondTime,
                }
            });
        }
        return post;
    }

    async getPostsByTags(tags: string[], from = 0, amount = 50) {
        return this.prisma.post.findMany({

            where: {
                tags: {
                    hasEvery: tags,
                }
            },
            orderBy: [
                {
                    rating: "desc",
                }
            ],
            take: amount,
            skip: from,
            include: {
                author: true,
            },
        });
    }
}


