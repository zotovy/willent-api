import { Test, TestingModule } from '@nestjs/testing';
import { PostResolver } from '../../src/post/post.resolver';
import { PostService } from "../../src/post/post.service";
import { PrismaService } from "../../src/prisma/prisma.service";
import { PostValidator } from "../../src/post/post.validator";
import { spy } from "./helpers";
import { post } from "./data";
import { AuthService } from "../../src/auth/auth.service";
import { AuthGuard } from "../../src/auth/auth.guard";

describe('PostResolver', () => {
    let resolver: PostResolver;
    let service: PostService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostResolver, PostService, PrismaService, PostValidator, AuthService, AuthGuard],
        }).compile();

        resolver = module.get<PostResolver>(PostResolver);
        service = module.get<PostService>(PostService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe("post() query", () => {
        it("should return post by id", async () => {
            spy(service, "getById", post);
            expect(await resolver.post(post.id)).toEqual(post);
        });

        it("should return null", async () => {
            spy(service, "getById", null);
            expect(await resolver.post(post.id)).toEqual(null);
        });
    });
});
