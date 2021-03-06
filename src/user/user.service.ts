import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import User, { RawSignupData, RawUpdateData } from "./user.type";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "../auth/auth.service";
import { UserValidator } from "./user.validator";
import { AuthTokens } from "../auth/types";
import * as fs from "fs";

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly authService: AuthService,
        private readonly userValidator: UserValidator,
    ) {
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    /// Create user by RawSignupData
    async signup(data: RawSignupData): Promise<UserWithTokens> {
        this.userValidator.validateSignupData(data);
        const user = await this.prisma.user.create({ data }).catch(e => {
            throw new HttpException(this.prisma.handleError(e), HttpStatus.BAD_REQUEST);
        }) as User;
        const tokens = this.authService.generateTokens(user);
        return { user, tokens };
    }

    /// Get auth tokens if credentials is ok
    async login(email: string, password: string): Promise<UserWithTokens | null> {
        const user = await this.prisma.user.findFirst({
            where: { email, password },
        }) as User | null;

        if (user == null) return null
        return {
            user,
            tokens: this.authService.generateTokens(user),
        };
    }

    updateToken(refresh: string) {
        const id = this.authService.decodeToken(refresh, "refresh");
        return this.authService.generateTokens({ id });
    }

    async updateUser(id: number, data: RawUpdateData) {
        if (Object.keys(data).length === 0) return;
        this.userValidator.validateUpdateData(data);
        return this.prisma.user.update({
            where: { id },
            data,
        }).catch(e => {
            throw new HttpException(this.prisma.handleError(e), HttpStatus.BAD_REQUEST);
        })
    }

    // Update user image
    async updateUserImage(id: number, hasImage: boolean) {
        return this.prisma.user.update({
            where: { id },
            data: {
                profileImage: hasImage
                    ? process.env.SERVER_URL + "/static/profile-images/" + id + ".jpg"
                    : null,
            }
        });
    }

    async getById(id: number) {
        return this.prisma.user.findFirst({
            where: { id }
        });
    }
}

export type UserWithTokens = { user: User, tokens: AuthTokens };
