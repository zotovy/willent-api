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

        ctx.userId = await this.authService.decodeHeader(ctx.headers.authorization);
        return true;
    }
}


@Injectable()
export class HttpAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        if (!req.headers?.authorization) {
            return false;
        }

        req.headers.userId = await this.authService.decodeHeader(req.headers.authorization);
        return true;
    }
}
