import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import User, { RawSignupData } from "./user.type";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "../auth/auth.service";
import { UserValidator } from "./user.validator";
import { AuthTokens } from "../auth/types";

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
}

export type UserWithTokens = { user: User, tokens: AuthTokens };
