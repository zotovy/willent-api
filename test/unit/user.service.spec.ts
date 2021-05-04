import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/user/user.service';
import { PrismaService } from "../../src/prisma/prisma.service";
import { tokens, user } from "./data";
import { Prisma } from "@prisma/client";
import { AuthService } from "../../src/auth/auth.service";
import { UserValidator } from "../../src/user/user.validator";
import { RawSignupData } from "../../src/user/user.type";
import { spy, spyException } from "./helpers";
import { HttpException } from "@nestjs/common";
import { JsonWebTokenError } from "jsonwebtoken";

describe('UserService', () => {
    let prisma: PrismaService;
    let auth: AuthService;
    let validator: UserValidator;
    let service: UserService;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, PrismaService, AuthService, UserValidator],
        }).compile();

        service = module.get<UserService>(UserService);
        prisma = module.get<PrismaService>(PrismaService);
        auth = module.get<AuthService>(AuthService);
        validator = module.get<UserValidator>(UserValidator);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe("findAll()", () => {
        it("should find all users", async () => {
            const result = [user, user, user];
            spy(prisma.user, "findMany", result);

            expect(await service.findAll()).toEqual(result);
        });
    })

    describe("signup()", () => {
        it("should signup user", async () => {
            const data: RawSignupData = user;
            spy(prisma.user, "create", user);
            spy(auth, "generateTokens", tokens, false);
            spy(validator, "validateSignupData", undefined);

            expect(await service.signup(data)).toEqual({ user, tokens });
            expect(prisma.user.create).toBeCalledTimes(1);
            expect(prisma.user.create).toBeCalledWith({ data });
        });

        it("should handle email unique error", async () => {
            const data: RawSignupData = user;
            spyException(prisma.user, "create", Prisma.PrismaClientKnownRequestError)
            spy(auth, "generateTokens", tokens, false);
            spy(validator, "validateSignupData", undefined);

            expect(await service.signup(data).catch(e => e)).toBeInstanceOf(HttpException);
            expect(prisma.user.create).toBeCalledTimes(1);
            expect(prisma.user.create).toBeCalledWith({ data });
        });
    });

    describe("login()", () => {
        it("should login user", async () => {
            spy(prisma.user, "findFirst", user);
            spy(auth, "generateTokens", tokens, false);

            expect(await service.login(user.email, user.password)).toEqual({ user, tokens });
            expect(prisma.user.findFirst).toBeCalledTimes(1);
            expect(prisma.user.findFirst).toBeCalledWith({ where: { email: user.email, password: user.password } });
        });

        it("shouldn't login user", async () => {
            spy(prisma.user, "findFirst", null);

            expect(await service.login(user.email, user.password)).toBeNull()
        });
    });

    describe("updateTokens()", () => {
        it("should update tokens", () => {
            spy(auth, "decodeToken", user.id, false);
            spy(auth, "generateTokens", tokens, false);
            expect(service.updateToken(tokens.refresh)).toEqual(tokens);
        });

        it("shouldn't update tokens", () => {
            spyException(auth, "decodeToken", HttpException, false);
            try {
                service.updateToken(tokens.refresh);
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
            }
        });
    });

    describe("updateUser", () => {
        it("should update user", async () => {
            const data: RawSignupData = user;
            spy(prisma.user, "update", user);
            spy(validator, "validateUpdateData", undefined);

            expect(await service.updateUser(user.id, data)).toEqual(user);
        });

        it("should throw email unique error", async () => {
            const data: RawSignupData = user;
            spyException(prisma.user, "update", Prisma.PrismaClientKnownRequestError);
            spy(validator, "validateUpdateData", undefined);

            expect(await service.updateUser(user.id, data).catch(e => e)).toBeInstanceOf(HttpException);
        });
    });
});
