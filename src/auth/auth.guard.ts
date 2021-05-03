import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext();

        if (!ctx.headers?.authorization) {
            return false;
        }

        ctx.user = await this.authService.decodeHeader(ctx.headers.authorization);
        return true;
    }
}