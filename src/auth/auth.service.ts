import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";

import User from "../user/user.type";
import { AuthTokens, TokenType } from "./types";

@Injectable()
export class AuthService {

    private get tokenAccessKey() {
        return process.env.TOKEN_KEY_ACCESS as string;
    }

    private get tokenRefreshKey() {
        return process.env.TOKEN_KEY_REFRESH as string;
    }

    /// Generate `access` or `refresh` token for received user
    private generateToken({ id }: User | { id: number }, type: TokenType): string {
        const expiresIn = type === "access" ? "10m" : "1y";
        const key = type === "access" ? this.tokenAccessKey : this.tokenRefreshKey;
        return jwt.sign({ id }, key, { expiresIn });
    }

    /// Decodes JWT token and return decoded user id
    public decodeToken(token: string, type: TokenType): number {
        const key = type === "access" ? this.tokenAccessKey : this.tokenRefreshKey;

        try {
            // @ts-ignore
            return parseInt(jwt.verify(token, key).id);
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

        return this.decodeToken(split[1], "access");
    }

    /// Generate both AuthTokens for received user
    public generateTokens = (user: User | { id: number }): AuthTokens => ({
        access: this.generateToken(user, "access"),
        refresh: this.generateToken(user, "refresh"),
    })
}
