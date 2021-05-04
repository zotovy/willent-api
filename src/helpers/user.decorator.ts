import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from "@nestjs/graphql";

export const UserId = createParamDecorator((data, context: ExecutionContext)  => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.userId;
});

export const HttpUserId = createParamDecorator((data, context: ExecutionContext)  => {
    const req = context.switchToHttp().getRequest();
    return req.headers.userId;
});
