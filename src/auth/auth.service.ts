import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";

import User from "../user/user.type";
import { AuthTokens, TokenType } from "./types";

@Injectable()
export class AuthService {

    private get tokenKey() {
        return process.env.TOKEN_KEY as string;
    }

    /// Generate `access` or `refresh` token for received user
    private generateToken({ id }: User | { id: number }, type: TokenType): string {
        const expiresIn: string = type === "access" ? "10m" : "1y";
        return jwt.sign({ id }, this.tokenKey, { expiresIn });
    }

    /// Decodes JWT token and return decoded user id
    public decodeToken(token: string): number {
        try {
            // @ts-ignore
            return parseInt(jwt.verify(token, this.tokenKey).id);
        } catch (err) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }

    /// Decodes giving header **Bearer <token>** and return user id
    public decodeHeader(header: string): number {
        const split = header.split(" ");

        if (split[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return this.decodeToken(split[1]);
    }

    /// Generate both AuthTokens for received user
    public generateTokens = (user: User | { id: number }): AuthTokens => ({
        access: this.generateToken(user, "access"),
        refresh: this.generateToken(user, "refresh"),
    })
}
