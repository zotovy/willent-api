import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../post/post.service';
import { spy } from "./helpers";
import { post } from "./data";
import { PrismaService } from "../prisma/prisma.service";
import { PostValidator } from "../post/post.validator";

describe('PostService', () => {
    let service: PostService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostService, PrismaService, PostValidator],
        }).compile();

        service = module.get<PostService>(PostService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe("getById()", () => {
        it("should return post by id", async () => {
            spy(prisma.post, "findFirst", post);
            expect(await service.getById(post.id)).toEqual(post);
            expect(prisma.post.findFirst).toBeCalledTimes(1);
        });

        it("should return null", async () => {
            spy(prisma.post, "findFirst", null);
            expect(await service.getById(post.id)).toEqual(null);
            expect(prisma.post.findFirst).toBeCalledTimes(1);
        });
    });
});
