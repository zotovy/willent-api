import { Injectable } from '@nestjs/common';
import Post, { CreatePostData } from "./post.type";
import { PrismaService } from "../prisma/prisma.service";
import { PostValidator } from "./post.validator";

@Injectable()
export class PostService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly validator: PostValidator,
    ) {
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

    async getPopular(from = 0, amount = 50) {
        return await this.prisma.post.findMany({
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


